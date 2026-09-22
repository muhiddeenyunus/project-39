export function createProduct(input) {
  return {
    id: input.id || Date.now(),
    brand: input.brand || "Generic",
    title: input.title || input.name,
    name: input.name || input.title,
    description: input.description || "",
    price: Number(input.price),
    oldPrice: input.oldPrice,
    discount: input.discount,
    badge: input.badge,
    category: input.category || "All",
    color: input.color || "black",
    rating: Number(input.rating || 4),
    image: input.image || input.imageUrl || "",
    stock: Number(input.stock ?? 10),
  };
}
