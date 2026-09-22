import { env } from "../config/env";

export function generateToken(payload) {
  const body = { ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000, k: env.jwtSecret };
  return Buffer.from(JSON.stringify(body)).toString("base64url");
}

export function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
    if (!payload?.exp || payload.exp < Date.now()) return null;
    if (payload.k !== env.jwtSecret) return null;
    return payload;
  } catch {
    return null;
  }
}
