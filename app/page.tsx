"use client";
import { useState, useMemo } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  FileText,
  Store,
  BadgeDollarSign,
  Package,
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowRight,
  Star,
  X,
  Check,
  User,
  Gift,
  RotateCcw,
  LogOut,
  Home as HomeIcon,
  ShoppingCart,
  MapPin,
  DollarSign,
} from "lucide-react";

type Product = {
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
  inCart?: boolean;
};

const PRODUCTS: Product[] = [
  { id: 1, brand: "Noise", title: "Buds X Prime Truly Wireless Earbuds", price: 99.99, category: "Electronics", color: "white", rating: 4.5, badge: "New", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" },
  { id: 2, brand: "PowerA", title: "Fusion Pro Wireless Gaming Controller", price: 84.99, category: "Electronics", color: "black", rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop" },
  { id: 3, brand: "Apple", title: "AirPods Max Over-Ear Wireless Headphone", price: 549.99, oldPrice: 699.99, discount: "15% OFF", category: "Electronics", color: "gray", rating: 4.8, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop" },
  { id: 4, brand: "Sony", title: "WH-1000XM5 Noise Cancelling Headphones", price: 349.99, oldPrice: 449.99, discount: "22% OFF", category: "Electronics", color: "black", rating: 4.9, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop" },
  { id: 5, brand: "Apple", title: "iPhone 14 Pro Max 256GB Deep Purple", price: 1199.99, category: "Mobile", color: "purple", rating: 4.9, badge: "New", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop" },
  { id: 6, brand: "Samsung", title: "Galaxy S23 Ultra Phantom Black", price: 999.99, discount: "17% OFF", oldPrice: 1199.99, category: "Mobile", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop" },
  { id: 7, brand: "Titan", title: "Neo AMOLED Smartwatch with GPS", price: 129.99, oldPrice: 159.99, category: "Watches", color: "black", rating: 4.4, badge: "New", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" },
  { id: 8, brand: "Fastrack", title: "Reflex Fitness Band with Heart Rate Monitor", price: 39.99, oldPrice: 49.99, category: "Watches", color: "black", rating: 4.2, badge: "New", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop" },
  { id: 9, brand: "Garmin", title: "Vivo Active GPS Sports Watch", price: 249.99, oldPrice: 299.99, discount: "17% OFF", category: "Watches", color: "black", rating: 4.6, image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=400&fit=crop" },
  { id: 10, brand: "Fossil", title: "Gen 6 Touchscreen Smart Watch", price: 199.99, oldPrice: 269.99, discount: "25% OFF", category: "Watches", color: "white", rating: 4.3, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop" },
  { id: 11, brand: "Noise", title: "Air Buds Pro 2 With ANC Technology", price: 59.99, oldPrice: 79.99, category: "Electronics", color: "white", rating: 4.1, badge: "New", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop" },
  { id: 12, brand: "Apple", title: "Apple Watch Ultra Rugged Titanium", price: 799.99, category: "Watches", color: "orange", rating: 4.9, badge: "New", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&sat=-100" },

  { id: 13, brand: "Philips", title: "Air Fryer XL 6.2L with Rapid Air Tech", price: 149.99, oldPrice: 199.99, discount: "25% OFF", category: "Kitchen Appliances", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=400&h=400&fit=crop" },
  { id: 14, brand: "Prestige", title: "Mixer Grinder 750W with 3 Jars", price: 69.99, category: "Kitchen Appliances", color: "red", rating: 4.3, image: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=400&h=400&fit=crop" },
  { id: 15, brand: "Bajaj", title: "Electric Kettle 1.5L Stainless Steel", price: 29.99, oldPrice: 39.99, discount: "25% OFF", category: "Kitchen Appliances", color: "white", rating: 4.2, image: "https://images.unsplash.com/photo-1544787219-7f47cc556763?w=400&h=400&fit=crop" },
  { id: 16, brand: "Zara", title: "Oversized Cotton T-Shirt Pack of 3", price: 49.99, category: "Clothing", color: "white", rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { id: 17, brand: "Levis", title: "501 Original Fit Jeans - Dark Wash", price: 89.99, oldPrice: 119.99, discount: "25% OFF", category: "Clothing", color: "blue", rating: 4.5, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
  { id: 18, brand: "Nike", title: "Air Max 270 Sneakers - Triple White", price: 159.99, category: "Clothing", color: "white", rating: 4.8, badge: "New", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { id: 19, brand: "Adidas", title: "Track Pants Tapered Fleece", price: 59.99, discount: "15% OFF", oldPrice: 69.99, category: "Clothing", color: "black", rating: 4.4, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop" },
  { id: 20, brand: "Lakme", title: "Absolute Serum Foundation SPF 30", price: 19.99, category: "Beauty & Skincare", color: "white", rating: 4.3, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" },
  { id: 21, brand: "Maybelline", title: "Fit Me Matte Lipstick Set 6pc", price: 34.99, oldPrice: 49.99, discount: "30% OFF", category: "Beauty & Skincare", color: "red", rating: 4.6, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop" },
  { id: 22, brand: "Ikea", title: "LACK Wall Shelf 190cm White", price: 39.99, category: "Home Decor", color: "white", rating: 4.5, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" },
  { id: 23, brand: "HomeCentre", title: "Decor Vase Set Ceramic 3pc", price: 79.99, oldPrice: 99.99, discount: "20% OFF", category: "Home Decor", color: "gray", rating: 4.4, image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&h=400&fit=crop" },
  { id: 24, brand: "Lego", title: "Star Wars The Mandalorian Set 753", price: 49.99, category: "Toys & Games", color: "gray", rating: 4.9, badge: "New", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop" },
  { id: 25, brand: "Sony", title: "PS5 DualSense Wireless Controller", price: 69.99, category: "Toys & Games", color: "white", rating: 4.8, image: "https://images.unsplash.com/photo-1604586376807-f73185cf5867?w=400&h=400&fit=crop" },
  { id: 26, brand: "OnePlus", title: "Nord Buds 2R Wireless Earbuds", price: 39.99, oldPrice: 59.99, discount: "33% OFF", category: "Electronics", color: "black", rating: 4.3, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop" },
  { id: 27, brand: "JBL", title: "Tune 760NC Wireless Headphones", price: 129.99, category: "Electronics", color: "blue", rating: 4.5, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop" },
  { id: 28, brand: "Casio", title: "G-Shock Digital Sports Watch", price: 149.99, discount: "17% OFF", oldPrice: 179.99, category: "Watches", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop" },
  { id: 29, brand: "Realme", title: "Narzo 60 5G 128GB Mars Orange", price: 249.99, category: "Mobile", color: "orange", rating: 4.4, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop" },
  { id: 30, brand: "Xiaomi", title: "Redmi Note 12 Pro 256GB Frosted Blue", price: 299.99, oldPrice: 349.99, discount: "14% OFF", category: "Mobile", color: "blue", rating: 4.5, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop" },
  { id: 31, brand: "H&M", title: "Slim Fit Blazer & Coats Wool Blend", price: 129.99, category: "Clothing", color: "gray", rating: 4.2, badge: "New", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop" },
  { id: 32, brand: "Forest Essentials", title: "Sunscreen SPF 50 PA+++ 100ml", price: 24.99, category: "Beauty & Skincare", color: "white", rating: 4.7, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { id: 33, brand: "Pepperfry", title: "Indoor Floor Lamp Modern Arc", price: 89.99, category: "Home Decor", color: "black", rating: 4.3, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop" },
  { id: 34, brand: "Hot Wheels", title: "Collector Race Track Set", price: 29.99, category: "Toys & Games", color: "red", rating: 4.6, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop" },
  { id: 35, brand: "KitchenAid", title: "Hand Blender 5-Speed Red", price: 99.99, oldPrice: 129.99, discount: "23% OFF", category: "Kitchen Appliances", color: "red", rating: 4.8, image: "https://images.unsplash.com/photo-1578849278619-e730829bd58e?w=400&h=400&fit=crop" },
  { id: 36, brand: "Bose", title: "SoundLink Flex Bluetooth Speaker", price: 149.99, category: "Electronics", color: "black", rating: 4.7, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop" },
  { id: 37, brand: "Boat", title: "Storm Smartwatch 1.3 Curved Display", price: 49.99, oldPrice: 79.99, discount: "37% OFF", category: "Watches", color: "blue", rating: 4.2, image: "https://images.unsplash.com/photo-1508685096788-8be732f0144d?w=400&h=400&fit=crop" },
  { id: 38, brand: "Oppo", title: "Reno 10 5G Silvery Grey 256GB", price: 449.99, category: "Mobile", color: "gray", rating: 4.6, image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop" },
  { id: 39, brand: "Ray Ban", title: "Aviator Classic Gold Sunglasses", price: 159.99, discount: "20% OFF", oldPrice: 199.99, category: "Clothing", color: "black", rating: 4.8, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop" },
  { id: 40, brand: "Nivea", title: "Face Wash + Cleanser Duo Pack", price: 14.99, category: "Beauty & Skincare", color: "blue", rating: 4.1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
];

const CATEGORIES = ["All", "Electronics", "Kitchen Appliances", "Watches", "Mobile", "Clothing", "Beauty & Skincare", "Home Decor", "Toys & Games"];
const BRANDS = ["Noise", "PowerA", "Apple", "Titan", "Fastrack", "Garmin", "Sony", "Samsung"];
const COLORS = [
  { name: "white", hex: "#ffffff" },
  { name: "black", hex: "#1f2937" },
  { name: "green", hex: "#00d084" },
  { name: "blue", hex: "#1e90ff" },
  { name: "gray", hex: "#9ca3af" },
  { name: "slate", hex: "#475569" },
  { name: "red", hex: "#ff2a5a" },
];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([8, 1200]);
  const [discountFilter, setDiscountFilter] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<string>("All Ratings");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<number[]>([3, 6, 10]);
  const [cart, setCart] = useState<number[]>([1, 7]);
  const [showMega, setShowMega] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartView, setCartView] = useState<"shop" | "cart">("shop");
  const [showFakePayment, setShowFakePayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleBrand = (b: string) => setSelectedBrands((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]));
  const toggleWishlist = (id: number) => setWishlist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const toggleCart = (id: number) => setCart((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const filtered = useMemo(() => {
    let r = [...PRODUCTS];
    if (category !== "All") r = r.filter((p) => p.category === category);
    if (selectedBrands.length) r = r.filter((p) => selectedBrands.includes(p.brand));
    r = r.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (discountFilter) {
      const min = parseInt(discountFilter);
      r = r.filter((p) => {
        if (!p.oldPrice || !p.discount) return false;
        const disc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
        return disc >= min;
      });
    }
    if (selectedColor) r = r.filter((p) => p.color === selectedColor);
    if (ratingFilter !== "All Ratings") {
      const min = parseFloat(ratingFilter);
      r = r.filter((p) => p.rating >= min);
    }
    if (search) r = r.filter((p) => (p.brand + p.title).toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "Price: Low to High") r.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") r.sort((a, b) => b.price - a.price);
    if (sortBy === "Rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [category, selectedBrands, priceRange, discountFilter, selectedColor, ratingFilter, search, sortBy]);

  const clearAll = () => {
    setCategory("All");
    setSelectedBrands([]);
    setPriceRange([8, 1200]);
    setDiscountFilter(null);
    setSelectedColor(null);
    setRatingFilter("All Ratings");
    setSearch("");
  };

  const isDark = theme === "dark";
  return (
    <div className={`min-h-screen font-sans selection:bg-[#ff2a5a] selection:text-white ${isDark ? "bg-[#0a0a0a] text-white" : "bg-[#f5f5f7] text-zinc-900"}`}>

      
      <header className={`sticky top-0 z-40 border-b ${isDark ? "bg-[#0f0f0f] border-white/10" : "bg-white border-zinc-200 shadow-sm"}`}>
        <div className="flex items-center gap-4 px-4 lg:px-8 py-3">
          
          <div className="flex items-center gap-6 shrink-0">
            <a href="#" className="flex items-center gap-2">
              <span className={`size-8 rounded-full flex items-center justify-center ${isDark ? "bg-white text-black" : "bg-zinc-900 text-white"}`}>
                <ShoppingBag size={18} />
              </span>
              <span className="text-lg font-bold tracking-tight">Project 39</span>
            </a>
            <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium">
              {[
                { label: "Catalog", icon: LayoutGrid, align: "left-0" },
                { label: "Collections", icon: Store, align: "left-0" },
                { label: "Deals", icon: BadgeDollarSign, align: "left-0" },
                { label: "Support", icon: FileText, align: "right-0" },
              ].map((item) => (
                <div key={item.label} className="relative group/nav">
                  <button className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${isDark ? "group-hover/nav:bg-white group-hover/nav:text-black" : "group-hover/nav:bg-zinc-900 group-hover/nav:text-white"}`}>
                    <item.icon size={14} /> {item.label} <ChevronDown size={14} className="group-hover/nav:rotate-180 transition" />
                  </button>
                  
                  <div className={`absolute ${item.align} top-full mt-2 hidden group-hover/nav:block w-[960px] max-w-[min(960px,calc(100vw-32px))] rounded-xl p-6 shadow-2xl z-50 border ${isDark ? "bg-[#141414] border-white/10" : "bg-white border-zinc-200"}`}>
                    <div className="grid grid-cols-4 gap-6">
                      <div className="col-span-3 grid grid-cols-3 gap-6 text-xs leading-6">
                        <div><p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Topwear</p><div className={`space-y-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Casual Shirts</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>T-Shirts</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Formal Shirts</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Jackets</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Rain Jackets</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Blazers & Coats</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Sweatshirts</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Suits</p><p className={`font-semibold mt-3 ${isDark ? "text-white" : "text-zinc-900"}`}>Festive Wear</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Kurtas & Kurta Sets</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Shervanis</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Nehru Jackets</p></div></div>
                        <div><p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Bottomwear</p><div className={`space-y-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Jeans</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Casual Trousers</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Formal Trousers</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Shorts</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Track Pants</p><p className={`font-semibold mt-3 ${isDark ? "text-white" : "text-zinc-900"}`}>Gadget</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Smart Wearables</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Headphones</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Speakers</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Fitness Gadgets</p><p className={`font-semibold mt-3 ${isDark ? "text-white" : "text-zinc-900"}`}>Sunglasses & Frames</p><p className={`font-semibold mt-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Watches</p></div></div>
                        <div><p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Personal Care</p><div className={`space-y-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Cleansers</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Sunscreen</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Shampoo</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Face Masks</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Perfume/Cologne</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Makeup Remover</p><p className={`font-semibold mt-3 ${isDark ? "text-white" : "text-zinc-900"}`}>Toys & Games</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Action Figures</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Board Games</p><p className={isDark ? "hover:text-white cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}>Outdoor Toys</p></div></div>
                      </div>
                      <div className={`rounded-xl p-4 flex flex-col items-center text-center border overflow-hidden ${isDark ? "bg-gradient-to-br from-[#2a1a0f] via-[#1f1a14] to-[#1a1a0f] border-white/5" : "bg-gradient-to-br from-orange-50 via-amber-50 to-stone-50 border-zinc-200"}`}>
                        <p className={`text-xl font-bold leading-tight ${isDark ? "text-white" : "text-zinc-900"}`}>Enjoy Flat <span className="text-[#ff4d4d]">50% OFF</span><br />Across All Categories</p>
                        <p className={`text-sm mt-2 ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>Grab Your Favorites Now.</p>
                        <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className={`mt-3 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 shrink-0 border ${isDark ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900"} cursor-pointer`}>Shop Now <ArrowRight size={14} /></button>
                        <div className="grid grid-cols-3 gap-2 mt-4 w-full">
                          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=260&fit=crop" alt="" className="rounded-lg h-24 w-full object-cover" />
                          <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=260&fit=crop" alt="" className="rounded-lg h-24 w-full object-cover" />
                          <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=260&fit=crop" alt="" className="rounded-lg h-24 w-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          
          <div className="flex-1 flex justify-center px-4">
            <div className="relative hidden md:flex w-full max-w-[560px]">
              <div className={`flex items-center gap-3 w-full rounded-2xl px-4 py-2.5 border shadow-sm transition ${isDark ? "bg-white/[0.08] border-white/10 focus-within:bg-white/[0.12] focus-within:border-white/20" : "bg-zinc-100 border-zinc-200 focus-within:bg-white focus-within:border-zinc-300 focus-within:shadow-md"}`}>
                <Search size={18} className={isDark ? "text-zinc-400" : "text-zinc-500"} />
                <input
                  value={search}
                  onFocus={() => setShowSearch(true)}
                  onChange={(e) => { setSearch(e.target.value); setShowSearch(true); }}
                  placeholder="Search for products, brands and more..."
                  className={`bg-transparent outline-none text-sm w-full ${isDark ? "placeholder:text-zinc-500 text-white" : "placeholder:text-zinc-500 text-zinc-900"}`}
                />
                <span className={`hidden lg:flex items-center gap-1 text-[11px] border rounded-lg px-1.5 py-1 shrink-0 ${isDark ? "text-zinc-500 border-white/10 bg-white/5" : "text-zinc-500 border-zinc-300 bg-white"}`}><span>⌘</span>K</span>
              </div>
              {showSearch && (
                <div className={`absolute top-full mt-2 w-full rounded-2xl border shadow-2xl p-3 z-50 ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-zinc-200"}`}>
                  <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border mb-3 ${isDark ? "bg-black/40 border-white/10" : "bg-zinc-50 border-zinc-200"}`}>
                    <Search size={14} className="text-zinc-500" />
                    <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, pages..." className={`bg-transparent outline-none text-sm w-full ${isDark ? "text-white placeholder:text-zinc-500" : "text-zinc-900 placeholder:text-zinc-500"}`} />
                  </div>
                  <p className={`text-xs mb-2 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Suggestions</p>
                  <div className="space-y-1">
                    {[
                      { icon: HomeIcon, label: "Home", act: () => { setCartView("shop"); setShowSearch(false); } },
                      { icon: ShoppingCart, label: "Shop", act: () => { setCartView("shop"); setShowSearch(false); document.getElementById('products')?.scrollIntoView({behavior:'smooth'}); } },
                      { icon: Star, label: "Wishlist", act: () => { setCategory("All"); setShowSearch(false); } },
                      { icon: User, label: "Profile", act: () => { setShowProfile(true); setShowSearch(false); } },
                      { icon: ShoppingBag, label: "Checkout", act: () => { setCartView("cart"); setShowSearch(false); } },
                    ].filter(s => !search || s.label.toLowerCase().includes(search.toLowerCase())).map(s => (
                      <button key={s.label} onClick={s.act} className={`cursor-pointer w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-zinc-100 text-zinc-900"}`}>
                        <s.icon size={16} /> {s.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setShowSearch(false)} className={`w-full mt-2 text-xs py-1 ${isDark ? "text-zinc-500" : "text-zinc-500"} cursor-pointer`}>Close</button>
                </div>
              )}
            </div>
          </div>

          
          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <button onClick={() => setCartView("cart")} className={`relative p-2 rounded-full transition ${isDark ? "hover:bg-white/10" : "hover:bg-zinc-100"} cursor-pointer`}>
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#ff2a5a] text-white text-[10px] size-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
            </button>
            <button onClick={() => setTheme(isDark ? "light" : "dark")} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"} className={`hidden md:flex p-1.5 rounded-full border transition ${isDark ? "bg-white/10 border-white/10 hover:bg-white/20 text-white" : "bg-zinc-900 border-zinc-900 text-white hover:bg-black"} cursor-pointer`}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="relative">
              <img src="https://i.pravatar.cc/100?img=12" alt="avatar" onClick={() => setShowProfile(v => !v)} className="size-8 rounded-lg object-cover border border-white/10 cursor-pointer" />
              {showProfile && (
                <div className={`absolute right-0 top-full mt-2 w-64 rounded-2xl border shadow-2xl overflow-hidden z-50 ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-zinc-200"}`}>
                  <div className={`p-4 flex gap-3 border-b ${isDark ? "border-white/10" : "border-zinc-100"}`}>
                    <img src="https://i.pravatar.cc/100?img=12" alt="" className="size-10 rounded-xl" />
                    <div><p className={`text-sm font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Cristofer Torff</p><p className="text-xs text-zinc-500">Cr@example.com</p></div>
                  </div>
                  <div className="p-2 space-y-1 text-sm">
                    <button onClick={() => setShowProfile(false)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-zinc-100 text-zinc-900"} cursor-pointer`}><User size={16} /> My Profile</button>
                    <button onClick={() => { setShowProfile(false); setCartView("shop"); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-zinc-100 text-zinc-900"} cursor-pointer`}><Heart size={16} /> My Wishlist</button>
                    <button onClick={() => { setShowProfile(false); setCartView("cart"); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-zinc-100 text-zinc-900"} cursor-pointer`}><Package size={16} /> My Orders</button>
                    <button className={`cursor-pointer w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-zinc-100 text-zinc-900"}`}><Gift size={16} /> Gift Cards</button>
                    <button className={`cursor-pointer w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-zinc-100 text-zinc-900"}`}><RotateCcw size={16} /> Return & Refunds</button>
                    <div className={`h-px my-1 ${isDark ? "bg-white/10" : "bg-zinc-100"}`} />
                    <button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[#ff2a5a] hover:bg-[#ff2a5a]/10 cursor-pointer"><LogOut size={16} /> Logout</button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className={`xl:hidden p-2 rounded-xl ${isDark ? "bg-white text-black" : "bg-zinc-900 text-white"} cursor-pointer`}><SlidersHorizontal size={18} /></button>
          </div>
        </div>
        
        <div className="md:hidden px-4 pb-3">
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${isDark ? "bg-white/[0.06] border-white/10" : "bg-zinc-100 border-zinc-200"}`}>
            <Search size={16} className={isDark ? "text-zinc-400" : "text-zinc-500"} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className={`bg-transparent outline-none text-sm w-full ${isDark ? "placeholder:text-zinc-500 text-white" : "placeholder:text-zinc-500 text-zinc-900"}`} />
          </div>
        </div>
      </header>

      {(showSearch || showProfile) && <div onClick={() => { setShowSearch(false); setShowProfile(false); }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30" />}

      
      <div className={`px-4 lg:px-8 py-3 text-sm flex items-center gap-2 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
        {cartView === "cart" ? (
          <button onClick={() => setCartView("shop")} className={`cursor-pointer ${isDark ? "hover:text-white" : "hover:text-zinc-900"}`}>← Back to Shop</button>
        ) : (
          <><a href="#" className={isDark ? "hover:text-white" : "hover:text-zinc-900"}>Home</a> <span>›</span> <span className={isDark ? "text-white" : "text-zinc-900 font-medium"}>Shop</span></>
        )}
      </div>

      {cartView === "cart" ? (
        <div className="px-4 lg:px-8 pb-10">
          
          <div className={`rounded-2xl p-6 mb-6 border ${isDark ? "bg-[#1e1e1e] border-white/10" : "bg-white border-zinc-200 shadow-sm"}`}>
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[
                { icon: ShoppingCart, label: "Cart", active: true },
                { icon: MapPin, label: "Address", active: false },
                { icon: DollarSign, label: "Payment", active: false },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 flex-1">
                  <div className="flex flex-col items-center gap-2">
                    <span className={`size-10 rounded-full flex items-center justify-center border ${s.active ? "bg-white text-black border-white" : isDark ? "bg-white/10 text-zinc-400 border-white/10" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}><s.icon size={18} /></span>
                    <span className={`text-sm font-medium ${s.active ? (isDark ? "text-white" : "text-zinc-900") : "text-zinc-500"}`}>{s.label}</span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-px mx-4 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />}
                </div>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className={`rounded-xl p-4 flex items-center justify-between border ${isDark ? "bg-[#141414] border-white/10" : "bg-white border-zinc-200"}`}>
                <p className={`font-medium ${isDark ? "text-white" : "text-zinc-900"}`}>Add more from Wishlist</p>
                <ArrowRight size={18} className="text-zinc-500" />
              </div>
              {PRODUCTS.filter(p => cart.includes(p.id)).slice(0,2).concat(PRODUCTS.filter(p => !cart.includes(p.id)).slice(0, Math.max(0,2-cart.length))).map(p => (
                <div key={p.id} className={`rounded-xl overflow-hidden border flex ${isDark ? "bg-[#141414] border-white/10" : "bg-white border-zinc-200"}`}>
                  <div className={`w-40 shrink-0 flex items-center justify-center p-4 relative ${isDark ? "bg-[#242424]" : "bg-zinc-50"}`}>
                    <span className={`absolute top-2 left-2 size-5 rounded border flex items-center justify-center ${isDark ? "bg-white border-white" : "bg-white border-zinc-300"}`}><Check size={12} className="text-black" /></span>
                    
                    <img src={p.image} alt={p.title} className="w-full h-28 object-contain" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs border border-[#00d084] text-[#00d084] rounded-full px-2 py-0.5">Delivery by 24 January 2026</span>
                      <button className="cursor-pointer" onClick={() => toggleCart(p.id)}><X size={16} className="text-zinc-500" /></button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">Order ID: XYZ-42324234</p>
                    <p className={`font-semibold mt-1 ${isDark ? "text-white" : "text-zinc-900"}`}>{p.brand}</p>
                    <p className="text-xs text-zinc-500 line-clamp-2">{p.title} with 13mm drivers, environmental noise cancellation for calls, low-latency gaming mode, and a 40-hour battery life.</p>
                    <p className="text-xs text-zinc-500 mt-2">Size: M &nbsp;|&nbsp; Qty: 1 &nbsp;|&nbsp; Color: {p.color}</p>
                    <p className={`text-sm font-bold mt-1 ${isDark ? "text-white" : "text-zinc-900"}`}>${p.price.toFixed(2)} <span className="text-xs text-zinc-500 line-through font-normal">{p.oldPrice ? `$${p.oldPrice.toFixed(2)}` : `$${p.price.toFixed(2)}`}</span></p>
                  </div>
                </div>
              ))}
              {cart.length === 0 && <p className="text-sm text-zinc-500 text-center py-8">Your cart is empty — add items from Shop.</p>}
            </div>
            <div className={`rounded-2xl p-5 border h-fit ${isDark ? "bg-black border-white/10" : "bg-white border-zinc-200 shadow-sm"}`}>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Pricing Details</h3>
              <p className="text-xs text-zinc-500 mt-1">You have {cart.length} items Selected in your cart</p>
              <div className={`mt-4 rounded-xl p-3 border ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-zinc-50 border-zinc-200"}`}>
                <div className="flex items-center justify-between text-sm"><span className={`font-medium flex items-center gap-1 ${isDark ? "text-white" : "text-zinc-900"}`}>Coupon Code <span className="size-4 bg-[#00d084] text-white rounded-full flex items-center justify-center text-[10px]">%</span></span><span className="text-xs text-zinc-500 flex items-center gap-1">Show more offers <ArrowRight size={12} /></span></div>
                <input placeholder="Add discount code" className={`w-full mt-2 rounded-lg px-3 py-2 text-xs outline-none border ${isDark ? "bg-black border-white/10 text-white placeholder:text-zinc-600" : "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`} />
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span className={isDark ? "text-white font-medium" : "text-zinc-900 font-medium"}>${(cart.reduce((s,id)=> s + (PRODUCTS.find(p=>p.id===id)?.price||0),0) || 229.98).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Shipping Cost (+)</span><span className={isDark ? "text-white" : "text-zinc-900"}>$10.66</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Discount (-)</span><span className={isDark ? "text-white" : "text-zinc-900"}>$30.00</span></div>
                <div className={`h-px ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
                <div className="flex justify-between font-semibold"><span className={isDark ? "text-white" : "text-zinc-900"}>Total Payable</span><span className={isDark ? "text-white" : "text-zinc-900"}>${(cart.reduce((s,id)=> s + (PRODUCTS.find(p=>p.id===id)?.price||0),10.66-30) || 240.64).toFixed(2)}</span></div>
              </div>
              <button onClick={() => setShowFakePayment(true)} className={`w-full mt-6 py-3 rounded-full text-sm font-semibold ${isDark ? "bg-white text-black" : "bg-zinc-900 text-white"} cursor-pointer`}>Pay Now</button>
              <p className="text-xs text-zinc-500 text-center mt-2">Fake payment — no real money charged.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 lg:px-8 pb-10 flex gap-6">
        
        <aside className={`${mobileFilterOpen ? "flex" : "hidden"} lg:flex flex-col w-full lg:w-[260px] shrink-0 rounded-2xl p-5 h-fit sticky top-[72px] max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin border ${isDark ? "bg-[#141414] border-white/10" : "bg-white border-zinc-200 shadow-sm"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Filter</h2>
            <button onClick={clearAll} className="cursor-pointer text-sm text-[#ff2a5a] font-medium hover:underline">Clear All</button>
          </div>
          <div className={`h-px my-4 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />

          
          <div className="space-y-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className="flex items-center gap-3 cursor-pointer group w-full text-left">
                <span className={`size-5 rounded-full border-2 flex items-center justify-center ${category === c ? (isDark ? "border-white bg-white" : "border-zinc-900 bg-zinc-900") : (isDark ? "border-white/20 group-hover:border-white/40" : "border-zinc-300 group-hover:border-zinc-400")}`}>
                  {category === c && <span className={`size-2 rounded-full ${isDark ? "bg-black" : "bg-white"}`} />}
                </span>
                <span className={`text-sm ${category === c ? (isDark ? "text-white font-medium" : "text-zinc-900 font-medium") : (isDark ? "text-zinc-400" : "text-zinc-600")}`}>{c}</span>
              </button>
            ))}
          </div>

          
          <input type="hidden" value={category} readOnly />
          <div className="hidden">
            {CATEGORIES.map((c) => (
              <button className="cursor-pointer" key={c} onClick={() => setCategory(c)} />
            ))}
          </div>
          
          <div className="absolute inset-0 pointer-events-none" />
          
          <div className={`h-px my-5 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Brand</h3>
            <Search size={16} className="text-zinc-500" />
          </div>
          <div className="mt-3 space-y-2.5 max-h-32 overflow-y-auto pr-1">
            {BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2.5 cursor-pointer">
                <span
                  onClick={() => toggleBrand(b)}
                  className={`size-4 rounded border flex items-center justify-center ${selectedBrands.includes(b) ? (isDark ? "bg-white border-white text-black" : "bg-zinc-900 border-zinc-900 text-white") : (isDark ? "border-white/20" : "border-zinc-300")}`}
                >
                  {selectedBrands.includes(b) && <Check size={12} strokeWidth={3} />}
                </span>
                <span className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{b}</span>
              </label>
            ))}
          </div>

          
          <div className={`h-px my-5 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Price Range</h3>
          <div className="mt-4">
            <div className={`relative h-1 rounded-full ${isDark ? "bg-white/10" : "bg-zinc-200"}`}>
              <div className={`absolute h-full rounded-full ${isDark ? "bg-white" : "bg-zinc-900"}`} style={{ left: `${((priceRange[0] - 8) / 1192) * 100}%`, right: `${100 - ((priceRange[1] - 8) / 1192) * 100}%` }} />
              <span className={`absolute top-1/2 -translate-y-1/2 size-3 rounded-full border ${isDark ? "bg-white border-black/10" : "bg-white border-zinc-300 shadow"}`} style={{ left: `${((priceRange[0] - 8) / 1192) * 100}%` }} />
              <span className={`absolute top-1/2 -translate-y-1/2 size-3 rounded-full border ${isDark ? "bg-white border-black/10" : "bg-white border-zinc-300 shadow"}`} style={{ left: `${((priceRange[1] - 8) / 1192) * 100}%` }} />
            </div>
            <input type="range" min={8} max={1200} value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className="w-full opacity-0 -mt-3 block" />
            <input type="range" min={8} max={1200} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full opacity-0 -mt-3 block" />
            <div className={`flex justify-between text-xs mt-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              <span>${priceRange[0]}</span><span>${priceRange[1]}</span>
            </div>
          </div>

          
          <div className={`h-px my-5 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Discount</h3>
          <div className="mt-3 space-y-2">
            {["10% and above", "20% and above", "30% and above"].map((d) => (
              <button key={d} onClick={() => setDiscountFilter(discountFilter === d ? null : d)} className="flex items-center gap-3 cursor-pointer w-full text-left">
                <span className={`size-5 rounded-full border-2 flex items-center justify-center ${discountFilter === d ? (isDark ? "border-white bg-white" : "border-zinc-900 bg-zinc-900") : (isDark ? "border-white/20" : "border-zinc-300")}`}>
                  {discountFilter === d && <span className={`size-2 rounded-full ${isDark ? "bg-black" : "bg-white"}`} />}
                </span>
                <span className={`text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{d}</span>
              </button>
            ))}
          </div>

          
          <div className={`h-px my-5 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Color</h3><Search size={16} className="text-zinc-500" />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {COLORS.map((c) => (
              <button key={c.name}
                onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                className={`size-7 rounded-full border-2 flex items-center justify-center ${selectedColor === c.name ? (isDark ? "border-white scale-110" : "border-zinc-900 scale-110") : (isDark ? "border-white/10" : "border-zinc-200")} cursor-pointer`}
                style={{ background: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
          <button className={`cursor-pointer text-xs mt-2 text-left ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>5+ more</button>

          
          <div className={`h-px my-5 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Rating</h3>
          <div className="mt-3 space-y-2">
            {["All Ratings", "3+ Stars", "4+ Stars", "4.5+ Stars"].map((r) => (
              <button key={r} onClick={() => setRatingFilter(r)} className="flex items-center gap-3 cursor-pointer w-full text-left">
                <span className={`size-5 rounded-full border-2 flex items-center justify-center ${ratingFilter === r ? (isDark ? "border-white bg-white" : "border-zinc-900 bg-zinc-900") : (isDark ? "border-white/20" : "border-zinc-300")}`}>
                  {ratingFilter === r && <span className={`size-2 rounded-full ${isDark ? "bg-black" : "bg-white"}`} />}
                </span>
                <span className={`text-sm flex items-center gap-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  {r} {r !== "All Ratings" && <Star size={12} className="fill-amber-400 text-amber-400" />}
                </span>
              </button>
            ))}
          </div>

          
          <div className="hidden">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </aside>

        
        <style>{`.scrollbar-none::-webkit-scrollbar{display:none}`}</style>

        
        <main className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h1 className="text-lg font-bold">All Products ({filtered.length})</h1>
            <div className="flex items-center gap-2">
              <div className={`flex items-center rounded-xl p-1 border ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-zinc-200"}`}>
                <button onClick={() => setView("grid")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${view === "grid" ? (isDark ? "bg-white text-black" : "bg-zinc-900 text-white") : (isDark ? "text-zinc-400" : "text-zinc-500")} cursor-pointer`}><LayoutGrid size={14} /> Grid</button>
                <button onClick={() => setView("list")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${view === "list" ? (isDark ? "bg-white text-black" : "bg-zinc-900 text-white") : (isDark ? "text-zinc-400" : "text-zinc-500")} cursor-pointer`}><List size={14} /> List</button>
              </div>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`appearance-none rounded-xl pl-3 pr-8 py-2 text-xs font-medium border ${isDark ? "bg-[#1a1a1a] border-white/10 text-white" : "bg-white border-zinc-200 text-zinc-900"}`}>
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs pointer-events-none hidden">Sort:</span>
              </div>
            </div>
          </div>

          
          <div className="hidden lg:block" />
          
          
          <div className="sr-only">
            {CATEGORIES.map((c) => (
              <button className="cursor-pointer" key={c} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>

          <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
            {filtered.map((p) => {
              const isWish = wishlist.includes(p.id);
              const isCart = cart.includes(p.id);
              return (
                <div key={p.id} className={`group rounded-2xl overflow-hidden transition border ${isDark ? "bg-[#1a1a1a] border-white/10 hover:border-white/20" : "bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300"} ${view === "list" ? "flex gap-4 p-3" : ""}`}>
                  <div className={`relative flex items-center justify-center overflow-hidden ${isDark ? "bg-[#242424]" : "bg-zinc-50"} ${view === "list" ? "w-48 shrink-0 rounded-xl" : "h-[220px]"}`}>
                    
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover mix-blend-normal group-hover:scale-105 transition duration-300" />
                    {p.badge && <span className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-full ${p.badge === "New" ? "bg-[#00d084] text-white" : "bg-[#ff4d4d] text-white"}`}>{p.badge}</span>}
                    {p.discount && <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-full bg-[#ff4d4d] text-white">{p.discount}</span>}
                    <button onClick={() => toggleWishlist(p.id)} className={`absolute top-3 right-3 size-7 rounded-full backdrop-blur flex items-center justify-center border transition ${isDark ? "bg-black/60 border-white/10 hover:bg-black" : "bg-white/90 border-zinc-200 hover:bg-white shadow-sm"} cursor-pointer`}>
                      <Heart size={14} className={isWish ? "fill-[#ff2a5a] text-[#ff2a5a]" : (isDark ? "text-white" : "text-zinc-600")} />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-1 flex-1">
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>{p.brand}</p>
                    <p className={`text-xs line-clamp-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{p.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>${p.price.toFixed(2)}</span>
                      {p.oldPrice && <span className="text-xs text-zinc-500 line-through">${p.oldPrice.toFixed(2)}</span>}
                      <span className={`ml-auto flex items-center gap-1 text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}><Star size={10} className="fill-amber-400 text-amber-400" />{p.rating}</span>
                    </div>
                    <button onClick={() => toggleCart(p.id)}
                      className={`mt-3 w-full rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${isDark ? (isCart ? "bg-white text-black border-white" : "bg-white text-black hover:bg-zinc-200 border-white") : (isCart ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-900 text-white hover:bg-black border-zinc-900")} cursor-pointer`}
                    >
                      {isCart ? <>Go to Cart <ArrowRight size={14} /></> : <>Add to Cart <ShoppingBag size={14} /></>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <X size={32} className="mx-auto mb-3 opacity-50" />
              <p>No products match your filters.</p>
              <button onClick={clearAll} className={`cursor-pointer mt-3 text-sm underline ${isDark ? "text-white" : "text-zinc-900"}`}>Clear all filters</button>
            </div>
          )}

          
          <div className="flex justify-center mt-8 gap-2">
            <button className={`cursor-pointer size-8 rounded-full text-sm font-bold ${isDark ? "bg-white text-black" : "bg-zinc-900 text-white"}`}>1</button>
            <button className={`cursor-pointer size-8 rounded-full text-sm ${isDark ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-600 border border-zinc-200"}`}>2</button>
            <button className={`cursor-pointer size-8 rounded-full text-sm ${isDark ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-600 border border-zinc-200"}`}>3</button>
            <span className="px-2 text-zinc-500">…</span>
            <button className={`cursor-pointer size-8 rounded-full ${isDark ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-600 border border-zinc-200"}`}><ArrowRight size={14} className="mx-auto" /></button>
          </div>
        </main>
      </div>
      )}

      
      <CategoryClickHandler category={category} setCategory={setCategory} />

      
      <button className={`cursor-pointer fixed bottom-4 right-4 text-xs font-bold px-4 py-2 rounded-full shadow-xl border hidden lg:block ${isDark ? "bg-white text-black border-black/10" : "bg-zinc-900 text-white border-zinc-900"}`}>Buy Now</button>

      {showFakePayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowFakePayment(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-zinc-200"}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>Fake Payment</h3>
              <button onClick={() => setShowFakePayment(false)} className={`size-8 rounded-full flex items-center justify-center border cursor-pointer ${isDark ? "border-white/10 hover:bg-white/10" : "border-zinc-200 hover:bg-zinc-100"}`}><X size={16} /></button>
            </div>
            {!paymentSuccess ? (
              <div className="mt-4 space-y-3">
                <p className={`text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>No real money will be charged. Click Pay to simulate success.</p>
                <input placeholder="4242 4242 4242 4242" className={`w-full rounded-xl px-3 py-2.5 text-sm border outline-none ${isDark ? "bg-black border-white/10 text-white placeholder:text-zinc-500" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`} />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" className={`rounded-xl px-3 py-2.5 text-sm border outline-none ${isDark ? "bg-black border-white/10 text-white placeholder:text-zinc-500" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`} />
                  <input placeholder="CVC" className={`rounded-xl px-3 py-2.5 text-sm border outline-none ${isDark ? "bg-black border-white/10 text-white placeholder:text-zinc-500" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`} />
                </div>
                <button onClick={() => { setPaymentSuccess(true); setTimeout(() => { setCart([]); setShowFakePayment(false); setPaymentSuccess(false); setCartView("shop"); }, 1200); }} className={`w-full py-3 rounded-full text-sm font-semibold cursor-pointer ${isDark ? "bg-white text-black" : "bg-zinc-900 text-white"}`}>Pay ${(cart.reduce((s,id)=> s + (PRODUCTS.find(p=>p.id===id)?.price||0),10.66-30) || 240.64).toFixed(2)}</button>
                <button onClick={() => setShowFakePayment(false)} className={`w-full py-2.5 rounded-full text-sm font-medium border cursor-pointer ${isDark ? "border-white/10 text-zinc-400 hover:bg-white/5" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`}>Cancel</button>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <div className="mx-auto size-12 rounded-full bg-[#00d084] flex items-center justify-center"><Check size={20} className="text-white" /></div>
                <p className={`mt-3 font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Payment Successful</p>
                <p className="text-sm text-zinc-500 mt-1">Fake transaction completed.</p>
              </div>
            )}
          </div>
        </div>
      )}

      
      <footer className={`border-t px-4 lg:px-8 py-8 mt-4 ${isDark ? "border-white/10 bg-[#0f0f0f]" : "border-zinc-200 bg-white"}`}>
        <div className={`flex flex-col md:flex-row justify-between gap-6 text-sm ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>
          <div>
            <p className={`font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-zinc-900"}`}><span className={`size-6 rounded-full flex items-center justify-center ${isDark ? "bg-white text-black" : "bg-zinc-900 text-white"}`}><ShoppingBag size={12} /></span> Project 39</p>
          </div>
          <div className="flex gap-8">
            <div><p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Company</p><p>About</p><p>Careers</p><p>Contact</p></div>
            <div><p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Support</p><p>Shipping</p><p>Returns</p><p>FAQ</p></div>
            <div><p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Legal</p><p>Privacy</p><p>Terms</p><p>Warranty</p></div>
          </div>
        </div>
        <p className={`text-xs mt-8 text-center ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>© 2026 Project 39. All rights reserved.</p>
      </footer>
    </div>
  );
}

function CategoryClickHandler({ setCategory }: { category: string; setCategory: (c: string) => void }) {

  if (typeof document !== "undefined") {

  }
  return null;
}
