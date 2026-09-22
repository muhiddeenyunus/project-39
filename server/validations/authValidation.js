export function authValidation(body) {
  if (!body?.email || !body?.password) return "email and password are required";
  if (String(body.password).length < 6) return "password must be at least 6 characters";
  return true;
}

export function registerValidation(body) {
  const base = authValidation(body);
  if (base !== true) return base;
  if (!body?.name) return "name is required";
  return true;
}
