import { ok } from "../utils/apiResponse";
import { validate } from "../middleware/validateMiddleware";
import { requireUser } from "../middleware/authMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import { orderValidation } from "../validations/orderValidation";
import * as orderService from "../services/orderService";

export const create = wrap(async (req) => {
  const user = await requireUser(req);
  const body = await req.json().catch(() => ({}));
  const invalid = validate(orderValidation, body);
  if (invalid) return invalid;
  return ok(await orderService.checkout(user.id, body), 201);
});

export const list = wrap(async (req) => {
  const user = await requireUser(req);
  return ok(await orderService.listOrders(user.id, user.role === "ADMIN"));
});

export const detail = wrap(async (req, ctx) => {
  const user = await requireUser(req);
  const { id } = await ctx.params;
  return ok(await orderService.getOrder(user.id, id, user.role === "ADMIN"));
});
