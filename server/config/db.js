import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { env, useSupabase } from "./env";
import { PRODUCTS } from "../../lib/catalog";

const file = path.join(process.cwd(), "data", "db.json");

function emptyDb() {
  return { users: [], products: PRODUCTS.map((p) => ({ ...p })), carts: [], orders: [], payments: [] };
}

export function loadDb() {
  try {
    const db = JSON.parse(fs.readFileSync(file, "utf8"));
    const existingProducts = new Map((db.products || []).map((product) => [String(product.id), product]));
    db.products = PRODUCTS.map((product) => existingProducts.get(String(product.id)) || { ...product });
    return db;
  } catch {
    const db = emptyDb();
    saveDb(db);
    return db;
  }
}

export function saveDb(db) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}

export function getSupabase() {
  if (!useSupabase()) return null;
  return createClient(env.supabaseUrl, env.supabaseServiceKey || env.supabaseAnonKey);
}

export async function sList(table, filter) {
  let q = getSupabase().from(table).select("*");
  if (filter) for (const [k, v] of Object.entries(filter)) q = q.eq(k, v);
  const { data, error } = await q;
  if (error) throw Object.assign(new Error(error.message), { status: 500 });
  return data || [];
}

export async function sGet(table, id) {
  const { data, error } = await getSupabase().from(table).select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function sInsert(table, row) {
  const { data, error } = await getSupabase().from(table).insert(row).select().single();
  if (error) throw Object.assign(new Error(error.message), { status: 500 });
  return data;
}

export async function sUpsert(table, row) {
  const { data, error } = await getSupabase().from(table).upsert(row).select().single();
  if (error) throw Object.assign(new Error(error.message), { status: 500 });
  return data;
}

export async function sUpdate(table, id, patch) {
  const { data, error } = await getSupabase().from(table).update(patch).eq("id", id).select().single();
  if (error) throw Object.assign(new Error(error.message), { status: 500 });
  return data;
}

export async function sDelete(table, id) {
  const { error } = await getSupabase().from(table).delete().eq("id", id);
  if (error) throw Object.assign(new Error(error.message), { status: 500 });
}

export function productFromRow(r) {
  if (!r) return null;
  return { id: Number(r.id), brand: r.brand, title: r.title, name: r.title, description: r.description || "", price: Number(r.price), category: r.category, color: r.color, rating: Number(r.rating ?? 4), image: r.image, stock: Number(r.stock ?? 0) };
}

export function productToRow(p) {
  return { brand: p.brand, title: p.title, description: p.description || "", price: Number(p.price), stock: Number(p.stock ?? 0), category: p.category || "All", color: p.color || "black", rating: Number(p.rating || 4), image: p.image || "" };
}

export function userFromRow(r) {
  if (!r) return null;
  return { id: r.id, name: r.name, email: r.email, role: r.role || "CUSTOMER", createdAt: r.created_at };
}

export function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}
