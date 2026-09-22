import { ok } from "../utils/apiResponse";
import { validate } from "../middleware/validateMiddleware";
import { requireUser } from "../middleware/authMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import { paymentValidation } from "../validations/paymentValidation";
import * as paymentService from "../services/paymentService";

export const initialize = wrap(async (req) => {
  const user = await requireUser(req);
  const body = await req.json().catch(() => ({}));
  const invalid = validate(paymentValidation, body);
  if (invalid) return invalid;
  return ok(await paymentService.initialize(user, body));
});

export const callback = wrap(async (req) => {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  try {
    const order = await paymentService.verifyAndFulfill(reference);
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/?paid=1&order=${order.id}`, 302);
  } catch {
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/?pay=failed`, 302);
  }
});
