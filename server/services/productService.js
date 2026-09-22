import { loadDb, saveDb, sList, sGet, sInsert, sUpdate, sDelete, productFromRow, productToRow } from "../config/db";
import { useSupabase } from "../config/env";
import { createProduct } from "../models/Product";
import { httpError } from "../middleware/errorHandlerMiddleware";

export async function listProducts({ search = "", page = 1, limit = 100 } = {}) {
  let rows = useSupabase() ? (await sList("products")).map(productFromRow) : loadDb().products;
  if (search) {
    const q = String(search).toLowerCase();
    rows = rows.filter((p) => `${p.brand} ${p.title} ${p.category}`.toLowerCase().includes(q));
  }
  const start = (Number(page) - 1) * Number(limit);
  return { items: rows.slice(start, start + Number(limit)), total: rows.length, page: Number(page), limit: Number(limit) };
}

export async function getProduct(id) {
  const product = useSupabase() ? productFromRow(await sGet("products", id)) : loadDb().products.find((p) => String(p.id) === String(id));
  if (!product) httpError(404, "product not found");
  return product;
}

export async function createProductRow(body) {
  if (useSupabase()) return productFromRow(await sInsert("products", productToRow(createProduct(body))));
  const db = loadDb();
  const product = createProduct(body);
  db.products.push(product);
  saveDb(db);
  return product;
}

export async function updateProduct(id, body) {
  if (useSupabase()) {
    const current = await sGet("products", id);
    if (!current) httpError(404, "product not found");
    return productFromRow(await sUpdate("products", id, productToRow({ ...productFromRow(current), ...body })));
  }
  const db = loadDb();
  const product = db.products.find((p) => String(p.id) === String(id));
  if (!product) httpError(404, "product not found");
  Object.assign(product, body, { id: product.id });
  saveDb(db);
  return product;
}

export async function deleteProduct(id) {
  if (useSupabase()) {
    const current = await sGet("products", id);
    if (!current) httpError(404, "product not found");
    await sDelete("products", id);
    return;
  }
  const db = loadDb();
  const next = db.products.filter((p) => String(p.id) !== String(id));
  if (next.length === db.products.length) httpError(404, "product not found");
  db.products = next;
  saveDb(db);
}
