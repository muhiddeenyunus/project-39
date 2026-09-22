import { ok } from "../utils/apiResponse";
import { validate } from "../middleware/validateMiddleware";
import { requireAdmin } from "../middleware/adminMiddleware";
import { wrap } from "../middleware/errorHandlerMiddleware";
import { productValidation } from "../validations/productValidation";
import * as productService from "../services/productService";

export const list = wrap(async (req) => {
  const { searchParams } = new URL(req.url);
  return ok(await productService.listProducts({
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 100,
  }));
});

export const detail = wrap(async (req, ctx) => {
  const { id } = await ctx.params;
  return ok(await productService.getProduct(id));
});

export const create = wrap(async (req) => {
  await requireAdmin(req);
  const body = await req.json();
  const invalid = validate(productValidation, body);
  if (invalid) return invalid;
  return ok(await productService.createProductRow(body), 201);
});

export const update = wrap(async (req, ctx) => {
  await requireAdmin(req);
  const { id } = await ctx.params;
  const body = await req.json();
  return ok(await productService.updateProduct(id, body));
});

export const remove = wrap(async (req, ctx) => {
  await requireAdmin(req);
  const { id } = await ctx.params;
  await productService.deleteProduct(id);
  return ok({ deleted: true }, 200);
});
