import { ok } from "../utils/apiResponse";
import { requireAdmin } from "../middleware/adminMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import { loadDb, sList, userFromRow } from "../config/db";
import { useSupabase } from "../config/env";
import { listOrders, updateOrderStatus } from "../services/orderService";

export const users = wrap(async (req) => {
  await requireAdmin(req);
  if (useSupabase()) return ok((await sList("users")).map(userFromRow));
  return ok(loadDb().users.map(({ passwordHash, ...u }) => u));
});

export const metrics = wrap(async (req) => {
  await requireAdmin(req);
  if (useSupabase()) {
    const [users, products, orders] = await Promise.all([sList("users"), sList("products"), sList("orders")]);
    return ok({ users: users.length, products: products.length, orders: orders.length, revenue: orders.reduce((s, o) => s + Number(o.total || 0), 0) });
  }
  const db = loadDb();
  return ok({
    users: db.users.length,
    products: db.products.length,
    orders: db.orders.length,
    revenue: db.orders.reduce((s, o) => s + Number(o.total || 0), 0),
  });
});

export const orders = wrap(async (req) => {
  const admin = await requireAdmin(req);
  return ok(await listOrders(admin.id, true));
});

export const patchOrder = wrap(async (req, ctx) => {
  await requireAdmin(req);
  const { id } = await ctx.params;
  const body = await req.json();
  return ok(await updateOrderStatus(id, body.status || "SHIPPED"));
});
