import { verifyToken } from "../utils/generateToken";
import { loadDb, publicUser, sList, userFromRow } from "../config/db";
import { useSupabase } from "../config/env";
import { httpError } from "./errorHandlerMiddleware";

export function readToken(req) {
  return req.cookies.get("auth_token")?.value || "";
}

export async function requireUser(req) {
  const payload = verifyToken(readToken(req));
  if (!payload?.id) httpError(401, "Unauthorized");
  if (useSupabase()) {
    const rows = await sList("users", { id: payload.id });
    if (!rows[0]) httpError(401, "Unauthorized");
    return userFromRow(rows[0]);
  }
  const user = loadDb().users.find((u) => u.id === payload.id);
  if (!user) httpError(401, "Unauthorized");
  return publicUser(user);
}
