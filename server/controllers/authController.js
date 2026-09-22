import { cookies } from "next/headers";
import { ok } from "../utils/apiResponse";
import { validate } from "../middleware/validateMiddleware";
import { requireUser } from "../middleware/authMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import { authValidation, registerValidation } from "../validations/authValidation";
import * as authService from "../services/authService";

async function setAuthCookie(token) {
  const jar = await cookies();
  jar.set("auth_token", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export const register = wrap(async (req) => {
  const body = await req.json();
  const invalid = validate(registerValidation, body);
  if (invalid) return invalid;
  const result = await authService.register(body);
  await setAuthCookie(result.token);
  return ok(result.user, 201);
});

export const login = wrap(async (req) => {
  const body = await req.json();
  const invalid = validate(authValidation, body);
  if (invalid) return invalid;
  const result = await authService.login(body);
  await setAuthCookie(result.token);
  return ok(result.user);
});

export const logout = wrap(async () => {
  const jar = await cookies();
  jar.set("auth_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return ok({ loggedOut: true });
});

export const me = wrap(async (req) => {
  const user = await requireUser(req);
  return ok(await authService.me(user.id));
});
