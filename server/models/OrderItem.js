export function createOrderItem({ productId, quantity, priceAtPurchase, product }) {
  return {
    id: crypto.randomUUID(),
    productId,
    quantity,
    priceAtPurchase,
    product,
  };
}
