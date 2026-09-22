export function createOrder({ userId, total, shippingAddress, items, paymentMethod, reference }) {
  return {
    id: crypto.randomUUID(),
    userId,
    total,
    status: "PAID",
    shippingAddress: shippingAddress || "Campus address",
    items,
    payment: {
      id: crypto.randomUUID(),
      method: paymentMethod || "card",
      status: "PAID",
      amount: total,
      reference: reference || `PAY-${Date.now()}`,
    },
    createdAt: new Date().toISOString(),
  };
}
