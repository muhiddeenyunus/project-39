import { loadDb, saveDb, sList, sGet, sInsert, sUpdate, sDelete, productFromRow } from "../config/db";
import { useSupabase } from "../config/env";
import { createCart, createCartItem } from "../models/Cart";
import { httpError } from "../middleware/errorHandlerMiddleware";

function localCart(db, userId) {
  let cart = db.carts.find((c) => c.userId === userId);
  if (!cart) {
    cart = createCart(userId);
    db.carts.push(cart);
  }
  return cart;
}

async function remoteCart(userId) {
  const rows = await sList("carts", { user_id: userId });
  if (rows[0]) return rows[0];
  return sInsert("carts", { id: crypto.randomUUID(), user_id: userId });
}

async function remoteCartView(cart) {
  const lines = await sList("cart_items", { cart_id: cart.id });
  const products = await sList("products");
  const items = lines.map((l) => ({
    id: l.id,
    productId: Number(l.product_id),
    quantity: l.quantity,
    product: productFromRow(products.find((p) => String(p.id) === String(l.product_id))) || null,
  }));
  return { id: cart.id, userId: cart.user_id, items, createdAt: cart.created_at };
}

function localCartView(db, cart) {
  const items = cart.items.map((item) => ({
    ...item,
    product: db.products.find((p) => p.id === item.productId) || null,
  }));
  return { ...cart, items };
}

export async function getCart(userId) {
  if (useSupabase()) return remoteCartView(await remoteCart(userId));
  const db = loadDb();
  const cart = localCart(db, userId);
  saveDb(db);
  return localCartView(db, cart);
}

export async function addItem(userId, { productId, quantity }) {
  const qty = Number(quantity);
  if (!qty || qty < 1) httpError(400, "quantity must be at least 1");
  if (useSupabase()) {
    const product = productFromRow(await sGet("products", productId));
    if (!product) httpError(404, "product not found");
    if (product.stock < qty) httpError(400, "not enough stock");
    const cart = await remoteCart(userId);
    const lines = await sList("cart_items", { cart_id: cart.id });
    const existing = lines.find((l) => String(l.product_id) === String(productId));
    if (existing) await sUpdate("cart_items", existing.id, { quantity: existing.quantity + qty });
    else await sInsert("cart_items", { id: crypto.randomUUID(), cart_id: cart.id, product_id: Number(productId), quantity: qty });
    return remoteCartView(cart);
  }
  const db = loadDb();
  const product = db.products.find((p) => String(p.id) === String(productId));
  if (!product) httpError(404, "product not found");
  if (product.stock < qty) httpError(400, "not enough stock");
  const cart = localCart(db, userId);
  const existing = cart.items.find((i) => String(i.productId) === String(productId));
  if (existing) existing.quantity += qty;
  else cart.items.push(createCartItem({ productId, quantity: qty }));
  saveDb(db);
  return localCartView(db, cart);
}

export async function updateItem(userId, itemId, quantity) {
  const qty = Number(quantity);
  if (qty < 1) httpError(400, "quantity must be at least 1");
  if (useSupabase()) {
    const cart = await remoteCart(userId);
    const lines = await sList("cart_items", { cart_id: cart.id });
    const item = lines.find((l) => l.id === itemId || String(l.product_id) === String(itemId));
    if (!item) httpError(404, "cart item not found");
    await sUpdate("cart_items", item.id, { quantity: qty });
    return remoteCartView(cart);
  }
  const db = loadDb();
  const cart = localCart(db, userId);
  const item = cart.items.find((i) => i.id === itemId || String(i.productId) === String(itemId));
  if (!item) httpError(404, "cart item not found");
  item.quantity = qty;
  saveDb(db);
  return localCartView(db, cart);
}

export async function removeItem(userId, itemId) {
  if (useSupabase()) {
    const cart = await remoteCart(userId);
    const lines = await sList("cart_items", { cart_id: cart.id });
    const item = lines.find((l) => l.id === itemId || String(l.product_id) === String(itemId));
    if (item) await sDelete("cart_items", item.id);
    return remoteCartView(cart);
  }
  const db = loadDb();
  const cart = localCart(db, userId);
  cart.items = cart.items.filter((i) => i.id !== itemId && String(i.productId) !== String(itemId));
  saveDb(db);
  return localCartView(db, cart);
}

export async function replaceItems(userId, productIds) {
  const ids = [...new Set((productIds || []).map(Number))];
  if (useSupabase()) {
    const cart = await remoteCart(userId);
    const lines = await sList("cart_items", { cart_id: cart.id });
    for (const l of lines) await sDelete("cart_items", l.id);
    for (const productId of ids) await sInsert("cart_items", { id: crypto.randomUUID(), cart_id: cart.id, product_id: productId, quantity: 1 });
    return remoteCartView(cart);
  }
  const db = loadDb();
  const cart = localCart(db, userId);
  cart.items = ids.map((productId) => createCartItem({ productId, quantity: 1 }));
  saveDb(db);
  return localCartView(db, cart);
}

export async function clearCart(userId) {
  if (useSupabase()) {
    const cart = await remoteCart(userId);
    const lines = await sList("cart_items", { cart_id: cart.id });
    for (const l of lines) await sDelete("cart_items", l.id);
    return;
  }
  const db = loadDb();
  localCart(db, userId).items = [];
  saveDb(db);
}
