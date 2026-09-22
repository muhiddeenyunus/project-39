export function createUser({ name, email, passwordHash, role }) {
  return {
    id: crypto.randomUUID(),
    name,
    email: String(email).toLowerCase(),
    passwordHash,
    role: role || "CUSTOMER",
    createdAt: new Date().toISOString(),
  };
}
