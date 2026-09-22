import { requireUser } from "./authMiddleware";
import { httpError } from "./errorHandlerMiddleware";

export async function requireAdmin(req) {
  const user = await requireUser(req);
  if (user.role !== "ADMIN") httpError(403, "Forbidden");
  return user;
}
