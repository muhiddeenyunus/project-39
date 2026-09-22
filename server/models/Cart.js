export function createCart(userId) {
  return { id: crypto.randomUUID(), userId, items: [], createdAt: new Date().toISOString() };
}

export function createCartItem({ productId, quantity }) {
  return { id: crypto.randomUUID(), productId: Number(productId), quantity: Number(quantity) };
}
