import { loadDb, saveDb, sInsert, sList, sUpdate } from "../config/db";
import { env, useSupabase, usePaystack } from "../config/env";
import { priceItems, checkout } from "./orderService";
import { httpError } from "../middleware/errorHandlerMiddleware";

async function paystack(path, options = {}) {
  if (!usePaystack()) httpError(503, "payments not configured yet");
  const res = await fetch(`https://api.paystack.co${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${env.paystackSecretKey}`, "Content-Type": "application/json" },
  });
  const json = await res.json().catch(() => ({}));
  if (!json.status) httpError(502, json.message || "payment provider error");
  return json.data;
}

export async function initialize(user, body = {}) {
  const source = body.items?.length
    ? body.items.map((i) => ({ productId: Number(i.productId), quantity: Number(i.quantity || 1) }))
    : (await import("./cartService").then((m) => m.getCart(user.id))).items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
  if (!source.length) httpError(400, "cart is empty");
  const priced = await priceItems(source);
  const total = priced.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);
  const data = await paystack("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      amount: Math.round(Number(total) * 100),
      currency: "NGN",
      callback_url: `${env.appUrl}/api/payments/callback`,
      metadata: { userId: user.id, shippingAddress: body.shippingAddress || "Campus address", items: source },
    }),
  });
  const pending = { id: crypto.randomUUID(), user_id: user.id, reference: data.reference, amount: total, currency: "NGN", status: "PENDING" };
  if (useSupabase()) {
    await sInsert("payments", pending).catch(() => {});
  } else {
    const db = loadDb();
    db.payments = db.payments || [];
    db.payments.push({ ...pending, createdAt: new Date().toISOString() });
    saveDb(db);
  }
  return { authorizationUrl: data.authorization_url, reference: data.reference };
}

export async function verifyAndFulfill(reference) {
  const data = await paystack(`/transaction/verify/${reference}`);
  if (data.status !== "success") httpError(402, "payment not successful");
  const meta = data.metadata || {};
  const order = await checkout(meta.userId, { items: meta.items, shippingAddress: meta.shippingAddress }, { reference: data.reference, status: "PAID" });
  if (useSupabase()) {
    const rows = await sList("payments", { reference: data.reference }).catch(() => []);
    if (rows[0]) await sUpdate("payments", rows[0].id, { status: "PAID", order_id: order.id }).catch(() => {});
  } else {
    const db = loadDb();
    const p = (db.payments || []).find((x) => x.reference === data.reference);
    if (p) {
      p.status = "PAID";
      p.orderId = order.id;
      saveDb(db);
    }
  }
  return order;
}
