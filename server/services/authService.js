import crypto from "crypto";
import { loadDb, saveDb, publicUser, getSupabase, sUpsert, sList, userFromRow } from "../config/db";
import { useSupabase } from "../config/env";
import { createUser } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { httpError } from "../middleware/errorHandlerMiddleware";

export function hash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `scrypt:${salt}:${key}`;
}

export function check(password, stored) {
  if (!stored?.startsWith("scrypt:")) {
    const legacy = Buffer.from(String(password)).toString("base64");
    return crypto.timingSafeEqual(Buffer.from(String(stored || "")), Buffer.from(legacy));
  }
  const [, salt, key] = String(stored).split(":");
  const derived = crypto.scryptSync(String(password), salt, 64);
  return crypto.timingSafeEqual(Buffer.from(key, "hex"), derived);
}

function roleFor(email, existingCount) {
  const normalized = String(email).toLowerCase();
  return normalized.includes("admin") || existingCount === 0 ? "ADMIN" : "CUSTOMER";
}

export async function register({ name, email, password }) {
  const normalized = String(email).toLowerCase();
  if (useSupabase()) {
    const supabase = getSupabase();
    const existing = await sList("users", { email: normalized });
    if (existing.length) httpError(409, "email taken");
    const { data, error } = await supabase.auth.signUp({ email: normalized, password: String(password) });
    if (error) httpError(400, error.message);
    const profile = await sUpsert("users", { id: data.user.id, name, email: normalized, role: roleFor(normalized, existing.length) });
    const user = userFromRow(profile);
    return { user, token: generateToken({ id: user.id, role: user.role }) };
  }
  const db = loadDb();
  if (db.users.find((u) => u.email === normalized)) httpError(409, "email taken");
  const user = createUser({ name, email: normalized, passwordHash: hash(password), role: roleFor(normalized, db.users.length) });
  db.users.push(user);
  db.carts.push({ id: crypto.randomUUID(), userId: user.id, items: [], createdAt: new Date().toISOString() });
  saveDb(db);
  return { user: publicUser(user), token: generateToken({ id: user.id, role: user.role }) };
}

export async function login({ email, password }) {
  const normalized = String(email).toLowerCase();
  if (useSupabase()) {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email: normalized, password: String(password) });
    if (error) httpError(401, "invalid credentials");
    const rows = await sList("users", { email: normalized });
    const profile = rows[0] || await sUpsert("users", { id: data.user.id, name: data.user.email.split("@")[0], email: normalized, role: "CUSTOMER" });
    const user = userFromRow(profile);
    return { user, token: generateToken({ id: user.id, role: user.role }) };
  }
  const user = loadDb().users.find((u) => u.email === normalized);
  if (!user || !check(password, user.passwordHash)) httpError(401, "invalid credentials");
  return { user: publicUser(user), token: generateToken({ id: user.id, role: user.role }) };
}

export async function me(userId) {
  if (useSupabase()) {
    const rows = await sList("users", { id: userId });
    if (!rows[0]) httpError(401, "Unauthorized");
    return userFromRow(rows[0]);
  }
  const user = loadDb().users.find((u) => u.id === userId);
  if (!user) httpError(401, "Unauthorized");
  return publicUser(user);
}
