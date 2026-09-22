import { loadDb, saveDb, sList, sInsert, sUpdate, sGet, sDelete, productFromRow } from "../config/db";
import { useSupabase } from "../config/env";
import { createOrder } from "../models/Order";
import { createOrderItem } from "../models/OrderItem";
import { httpError } from "../middleware/errorHandlerMiddleware";

function orderFromRows(order, lines, products) {
  return {
    id: order.id,
    userId: order.user_id,
    total: Number(order.total),
    status: order.status,
    shippingAddress: order.shipping_address,
    payment: { reference: order.paystack_reference, status: order.payment_status || "UNPAID" },
    items: lines.map((l) => ({
      id: l.id,
      productId: Number(l.product_id),
      quantity: l.quantity,
      priceAtPurchase: Number(l.price_at_purchase),
      product: productFromRow(products.find((p) => String(p.id) === String(l.product_id))) || null,
    })),
    createdAt: order.created_at,
  };
}

export async function listOrders(userId, isAdmin) {
  if (useSupabase()) {
    const orders = isAdmin ? await sList("orders") : await sList("orders", { user_id: userId });
    const products = await sList("products");
    const out = [];
    for (const o of orders) out.push(orderFromRows(o, await sList("order_items", { order_id: o.id }), products));
    return out;
  }
  const db = loadDb();
  if (isAdmin) return db.orders;
  return db.orders.filter((o) => o.userId === userId);
}

export async function getOrder(userId, id, isAdmin) {
  if (useSupabase()) {
    const order = await sGet("orders", id);
    if (!order) httpError(404, "order not found");
    if (!isAdmin && order.user_id !== userId) httpError(403, "Forbidden");
    return orderFromRows(order, await sList("order_items", { order_id: id }), await sList("products"));
  }
  const order = loadDb().orders.find((o) => o.id === id);
  if (!order) httpError(404, "order not found");
  if (!isAdmin && order.userId !== userId) httpError(403, "Forbidden");
  return order;
}

export async function priceItems(source) {
  if (useSupabase()) {
    const products = await sList("products");
    return source.map((item) => {
      const product = productFromRow(products.find((p) => String(p.id) === String(item.productId)));
      if (!product) httpError(404, "product not found");
      if (product.stock < Number(item.quantity || 1)) httpError(400, "not enough stock");
      return { product, quantity: Number(item.quantity || 1) };
    });
  }
  const db = loadDb();
  return source.map((item) => {
    const product = db.products.find((p) => String(p.id) === String(item.productId));
    if (!product) httpError(404, "product not found");
    if (product.stock < Number(item.quantity || 1)) httpError(400, "not enough stock");
    return { product, quantity: Number(item.quantity || 1) };
  });
}

export async function checkout(userId, body = {}, payment) {
  let source = body.items?.length
    ? body.items.map((i) => ({ productId: Number(i.productId), quantity: Number(i.quantity || 1) }))
    : null;
  if (useSupabase()) {
    const cartRows = await sList("carts", { user_id: userId });
    const cartLines = cartRows[0] ? await sList("cart_items", { cart_id: cartRows[0].id }) : [];
    if (!source) source = cartLines.map((l) => ({ productId: Number(l.product_id), quantity: l.quantity }));
    if (!source.length) httpError(400, "cart is empty");
    const priced = await priceItems(source);
    const total = priced.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);
    const id = crypto.randomUUID();
    for (const i of priced) await sUpdate("products", i.product.id, { stock: i.product.stock - i.quantity });
    await sInsert("orders", { id, user_id: userId, total, status: "PAID", shipping_address: body.shippingAddress || "Campus address", paystack_reference: payment?.reference || null, payment_status: payment ? "PAID" : "UNPAID" });
    for (const i of priced) await sInsert("order_items", { id: crypto.randomUUID(), order_id: id, product_id: i.product.id, quantity: i.quantity, price_at_purchase: i.product.price });
    if (cartRows[0] && !body.items?.length) for (const l of cartLines) await sDelete("cart_items", l.id).catch(() => {});
    return getOrder(userId, id, false);
  }
  const db = loadDb();
  const cart = db.carts.find((c) => c.userId === userId) || { items: [] };
  if (!source) source = cart.items || [];
  if (!source.length) httpError(400, "cart is empty");
  const items = source.map((item) => {
    const product = db.products.find((p) => String(p.id) === String(item.productId));
    if (!product) httpError(404, "product not found");
    if (product.stock < Number(item.quantity || 1)) httpError(400, "not enough stock");
    product.stock -= Number(item.quantity || 1);
    return createOrderItem({ productId: product.id, quantity: Number(item.quantity || 1), priceAtPurchase: product.price, product });
  });
  const total = items.reduce((sum, i) => sum + i.priceAtPurchase * i.quantity, 0);
  const order = createOrder({ userId, total, shippingAddress: body.shippingAddress, items, paymentMethod: body.paymentMethod, reference: payment?.reference });
  db.orders.push(order);
  if (cart.items) cart.items = [];
  saveDb(db);
  return order;
}

export async function updateOrderStatus(id, status) {
  if (useSupabase()) {
    const order = await sGet("orders", id);
    if (!order) httpError(404, "order not found");
    await sUpdate("orders", id, { status });
    return getOrder(order.user_id, id, true);
  }
  const db = loadDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) httpError(404, "order not found");
  order.status = status;
  saveDb(db);
  return order;
}
