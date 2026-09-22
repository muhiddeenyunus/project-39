import { ok } from "../utils/apiResponse";
import { requireUser } from "../middleware/authMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import { me as meService } from "../services/authService";

export const profile = wrap(async (req) => {
  const user = await requireUser(req);
  return ok(await meService(user.id));
});
