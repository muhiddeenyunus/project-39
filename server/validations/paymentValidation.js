export function paymentValidation(body) {
  if (body && body.items && !Array.isArray(body.items)) return "items must be an array";
  return true;
}
