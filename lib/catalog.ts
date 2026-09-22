export type Product = {
  id: number;
  brand: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  badge?: "New" | string;
  category: string;
  color: string;
  rating: number;
  image: string;
  stock: number;
  description: string;
};

export const PRODUCTS: Product[] = [
  { id: 1, brand: "Noise", title: "Buds X Prime Truly Wireless Earbuds", price: 99.99, category: "Electronics", color: "white", rating: 4.5, badge: "New", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop", stock: 40, description: "Wireless earbuds with long battery life." },
  { id: 2, brand: "PowerA", title: "Fusion Pro Wireless Gaming Controller", price: 84.99, category: "Electronics", color: "black", rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop", stock: 35, description: "Wireless gaming controller." },
  { id: 3, brand: "Apple", title: "AirPods Max Over-Ear Wireless Headphone", price: 549.99, oldPrice: 699.99, discount: "15% OFF", category: "Electronics", color: "gray", rating: 4.8, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop", stock: 12, description: "Over-ear wireless headphones." },
  { id: 4, brand: "Sony", title: "WH-1000XM5 Noise Cancelling Headphones", price: 349.99, oldPrice: 449.99, discount: "22% OFF", category: "Electronics", color: "black", rating: 4.9, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", stock: 20, description: "Noise cancelling headphones." },
  { id: 5, brand: "Apple", title: "iPhone 14 Pro Max 256GB Deep Purple", price: 1199.99, category: "Mobile", color: "purple", rating: 4.9, badge: "New", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", stock: 8, description: "Flagship smartphone." },
  { id: 6, brand: "Samsung", title: "Galaxy S23 Ultra Phantom Black", price: 999.99, discount: "17% OFF", oldPrice: 1199.99, category: "Mobile", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop", stock: 10, description: "Android flagship phone." },
  { id: 7, brand: "Titan", title: "Neo AMOLED Smartwatch with GPS", price: 129.99, oldPrice: 159.99, category: "Watches", color: "black", rating: 4.4, badge: "New", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", stock: 25, description: "GPS smartwatch." },
  { id: 8, brand: "Fastrack", title: "Reflex Fitness Band with Heart Rate Monitor", price: 39.99, oldPrice: 49.99, category: "Watches", color: "black", rating: 4.2, badge: "New", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop", stock: 50, description: "Fitness band." },
  { id: 9, brand: "Garmin", title: "Vivo Active GPS Sports Watch", price: 249.99, oldPrice: 299.99, discount: "17% OFF", category: "Watches", color: "black", rating: 4.6, image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=400&fit=crop", stock: 18, description: "Sports GPS watch." },
  { id: 10, brand: "Fossil", title: "Gen 6 Touchscreen Smart Watch", price: 199.99, oldPrice: 269.99, discount: "25% OFF", category: "Watches", color: "white", rating: 4.3, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop", stock: 22, description: "Touchscreen smartwatch." },
  { id: 11, brand: "Noise", title: "Air Buds Pro 2 With ANC Technology", price: 59.99, oldPrice: 79.99, category: "Electronics", color: "white", rating: 4.1, badge: "New", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop", stock: 30, description: "ANC earbuds." },
  { id: 12, brand: "Apple", title: "Apple Watch Ultra Rugged Titanium", price: 799.99, category: "Watches", color: "orange", rating: 4.9, badge: "New", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&sat=-100", stock: 6, description: "Rugged smartwatch." },
  { id: 13, brand: "Philips", title: "Air Fryer XL 6.2L with Rapid Air Tech", price: 149.99, oldPrice: 199.99, discount: "25% OFF", category: "Kitchen Appliances", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=400&h=400&fit=crop", stock: 15, description: "XL air fryer." },
  { id: 14, brand: "Prestige", title: "Mixer Grinder 750W with 3 Jars", price: 69.99, category: "Kitchen Appliances", color: "red", rating: 4.3, image: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=400&h=400&fit=crop", stock: 20, description: "Mixer grinder." },
  { id: 15, brand: "Bajaj", title: "Electric Kettle 1.5L Stainless Steel", price: 29.99, oldPrice: 39.99, discount: "25% OFF", category: "Kitchen Appliances", color: "white", rating: 4.2, image: "https://images.unsplash.com/photo-1544787219-7f47cc556763?w=400&h=400&fit=crop", stock: 40, description: "Electric kettle." },
  { id: 16, brand: "Zara", title: "Oversized Cotton T-Shirt Pack of 3", price: 49.99, category: "Clothing", color: "white", rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", stock: 45, description: "Cotton t-shirt pack." },
  { id: 17, brand: "Levis", title: "501 Original Fit Jeans - Dark Wash", price: 89.99, oldPrice: 119.99, discount: "25% OFF", category: "Clothing", color: "blue", rating: 4.5, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", stock: 28, description: "Original fit jeans." },
  { id: 18, brand: "Nike", title: "Air Max 270 Sneakers - Triple White", price: 159.99, category: "Clothing", color: "white", rating: 4.8, badge: "New", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", stock: 16, description: "Lifestyle sneakers." },
  { id: 19, brand: "Adidas", title: "Track Pants Tapered Fleece", price: 59.99, discount: "15% OFF", oldPrice: 69.99, category: "Clothing", color: "black", rating: 4.4, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", stock: 32, description: "Tapered fleece pants." },
  { id: 20, brand: "Lakme", title: "Absolute Serum Foundation SPF 30", price: 19.99, category: "Beauty & Skincare", color: "white", rating: 4.3, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", stock: 55, description: "SPF foundation." },
  { id: 21, brand: "Maybelline", title: "Fit Me Matte Lipstick Set 6pc", price: 34.99, oldPrice: 49.99, discount: "30% OFF", category: "Beauty & Skincare", color: "red", rating: 4.6, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", stock: 38, description: "Lipstick set." },
  { id: 22, brand: "Ikea", title: "LACK Wall Shelf 190cm White", price: 39.99, category: "Home Decor", color: "white", rating: 4.5, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", stock: 24, description: "Wall shelf." },
  { id: 23, brand: "HomeCentre", title: "Decor Vase Set Ceramic 3pc", price: 79.99, oldPrice: 99.99, discount: "20% OFF", category: "Home Decor", color: "gray", rating: 4.4, image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&h=400&fit=crop", stock: 19, description: "Ceramic vase set." },
  { id: 24, brand: "Lego", title: "Star Wars The Mandalorian Set 753", price: 49.99, category: "Toys & Games", color: "gray", rating: 4.9, badge: "New", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop", stock: 14, description: "Building set." },
  { id: 25, brand: "Sony", title: "PS5 DualSense Wireless Controller", price: 69.99, category: "Toys & Games", color: "white", rating: 4.8, image: "https://images.unsplash.com/photo-1604586376807-f73185cf5867?w=400&h=400&fit=crop", stock: 21, description: "Wireless controller." },
  { id: 26, brand: "OnePlus", title: "Nord Buds 2R Wireless Earbuds", price: 39.99, oldPrice: 59.99, discount: "33% OFF", category: "Electronics", color: "black", rating: 4.3, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop", stock: 33, description: "Wireless earbuds." },
  { id: 27, brand: "JBL", title: "Tune 760NC Wireless Headphones", price: 129.99, category: "Electronics", color: "blue", rating: 4.5, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", stock: 17, description: "Wireless headphones." },
  { id: 28, brand: "Casio", title: "G-Shock Digital Sports Watch", price: 149.99, discount: "17% OFF", oldPrice: 179.99, category: "Watches", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", stock: 11, description: "Digital sports watch." },
  { id: 29, brand: "Realme", title: "Narzo 60 5G 128GB Mars Orange", price: 249.99, category: "Mobile", color: "orange", rating: 4.4, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", stock: 13, description: "5G smartphone." },
  { id: 30, brand: "Xiaomi", title: "Redmi Note 12 Pro 256GB Frosted Blue", price: 299.99, oldPrice: 349.99, discount: "14% OFF", category: "Mobile", color: "blue", rating: 4.5, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", stock: 9, description: "Mid-range smartphone." },
  { id: 31, brand: "H&M", title: "Slim Fit Blazer & Coats Wool Blend", price: 129.99, category: "Clothing", color: "gray", rating: 4.2, badge: "New", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop", stock: 14, description: "Wool blend blazer." },
  { id: 32, brand: "Forest Essentials", title: "Sunscreen SPF 50 PA+++ 100ml", price: 24.99, category: "Beauty & Skincare", color: "white", rating: 4.7, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop", stock: 60, description: "SPF 50 sunscreen." },
  { id: 33, brand: "Pepperfry", title: "Indoor Floor Lamp Modern Arc", price: 89.99, category: "Home Decor", color: "black", rating: 4.3, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop", stock: 12, description: "Arc floor lamp." },
  { id: 34, brand: "Hot Wheels", title: "Collector Race Track Set", price: 29.99, category: "Toys & Games", color: "red", rating: 4.6, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop", stock: 26, description: "Race track set." },
  { id: 35, brand: "KitchenAid", title: "Hand Blender 5-Speed Red", price: 99.99, oldPrice: 129.99, discount: "23% OFF", category: "Kitchen Appliances", color: "red", rating: 4.8, image: "https://images.unsplash.com/photo-1578849278619-e730829bd58e?w=400&h=400&fit=crop", stock: 18, description: "5-speed hand blender." },
  { id: 36, brand: "Bose", title: "SoundLink Flex Bluetooth Speaker", price: 149.99, category: "Electronics", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", stock: 15, description: "Bluetooth speaker." },
  { id: 37, brand: "Boat", title: "Storm Smartwatch 1.3 Curved Display", price: 49.99, oldPrice: 79.99, discount: "37% OFF", category: "Watches", color: "blue", rating: 4.2, image: "https://images.unsplash.com/photo-1508685096788-8be732f0144d?w=400&h=400&fit=crop", stock: 29, description: "Curved display watch." },
  { id: 38, brand: "Oppo", title: "Reno 10 5G Silvery Grey 256GB", price: 449.99, category: "Mobile", color: "gray", rating: 4.6, image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop", stock: 7, description: "5G smartphone." },
  { id: 39, brand: "Ray Ban", title: "Aviator Classic Gold Sunglasses", price: 159.99, discount: "20% OFF", oldPrice: 199.99, category: "Clothing", color: "black", rating: 4.8, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", stock: 20, description: "Aviator sunglasses." },
  { id: 40, brand: "Nivea", title: "Face Wash + Cleanser Duo Pack", price: 14.99, category: "Beauty & Skincare", color: "blue", rating: 4.1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", stock: 70, description: "Face wash duo." },
];

export const CATEGORIES = ["All", "Electronics", "Kitchen Appliances", "Watches", "Mobile", "Clothing", "Beauty & Skincare", "Home Decor", "Toys & Games"];
export const BRANDS = ["Noise", "PowerA", "Apple", "Titan", "Fastrack", "Garmin", "Sony", "Samsung"];
export const COLORS = [
  { name: "white", hex: "#ffffff" },
  { name: "black", hex: "#1f2937" },
  { name: "green", hex: "#00d084" },
  { name: "blue", hex: "#1e90ff" },
  { name: "gray", hex: "#9ca3af" },
  { name: "slate", hex: "#475569" },
  { name: "red", hex: "#ff2a5a" },
];
