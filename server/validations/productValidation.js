export function productValidation(body) {
  if (!body?.title && !body?.name) return "title is required";
  if (body.price == null || Number(body.price) < 0) return "valid price is required";
  return true;
}
