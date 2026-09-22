import { ok } from "../utils/apiResponse";
import { requireUser } from "../middleware/authMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import * as cartService from "../services/cartService";

export const get = wrap(async (req) => {
  const user = await requireUser(req);
  return ok(await cartService.getCart(user.id));
});

export const add = wrap(async (req) => {
  const user = await requireUser(req);
  const body = await req.json();
  return ok(await cartService.addItem(user.id, body));
});

export const update = wrap(async (req, ctx) => {
  const user = await requireUser(req);
  const { id } = await ctx.params;
  const body = await req.json();
  return ok(await cartService.updateItem(user.id, id, body.quantity));
});

export const remove = wrap(async (req, ctx) => {
  const user = await requireUser(req);
  const { id } = await ctx.params;
  return ok(await cartService.removeItem(user.id, id));
});

export const sync = wrap(async (req) => {
  const user = await requireUser(req);
  const body = await req.json();
  return ok(await cartService.replaceItems(user.id, body.productIds || []));
});
