"use client";

import { useEffect, useState } from "react";

type Metrics = { users: number; products: number; orders: number; revenue: number };
type ShopUser = { id: string; name: string; email: string; role: string };
type ShopOrder = { id: string; total: number; status: string; userId: string };
type ShopProduct = { id: number; brand: string; title: string; price: number; stock: number };

export default function AdminPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [users, setUsers] = useState<ShopUser[]>([]);
  const [orders, setOrders] = useState<ShopOrder[]>([]);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [form, setForm] = useState({ brand: "", title: "", price: "", stock: "", category: "", image: "" });
  const [error, setError] = useState("");

  async function load() {
    const [m, u, o, p] = await Promise.all([
      fetch("/api/admin/metrics").then((r) => r.json()),
      fetch("/api/admin/users").then((r) => r.json()),
      fetch("/api/admin/orders").then((r) => r.json()),
      fetch("/api/products?limit=100").then((r) => r.json()),
    ]);
    if (!m.success) {
      setError(m.message || "Admin access required");
      return;
    }
    setMetrics(m.data);
    setUsers(u.data || []);
    setOrders(o.data || []);
    setProducts(p.data?.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock || 0) }),
    });
    const j = await res.json();
    if (!j.success) {
      setError(j.message || "Could not create product");
      return;
    }
    setForm({ brand: "", title: "", price: "", stock: "", category: "", image: "" });
    load();
  }

  async function deleteProduct(id: number) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }
  async function setStatus(id: string, status: string) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin</h1>
          <a href="/" className="text-sm underline">Back to shop</a>
        </div>
        {error && <p className="text-[#ff2a5a]">{error}</p>}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(metrics).map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white border border-zinc-200 p-4">
                <p className="text-xs text-zinc-500 uppercase">{k}</p>
                <p className="text-xl font-bold mt-1">{String(v)}</p>
              </div>
            ))}
          </div>
        )}
        <section className="rounded-xl bg-white border border-zinc-200 p-4">
          <h2 className="font-semibold mb-3">Users</h2>
          <div className="space-y-2 text-sm">
            {users.map((u) => (
              <div key={u.id} className="flex justify-between border-b border-zinc-100 py-2">
                <span>{u.name} · {u.email}</span>
                <span>{u.role}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl bg-white border border-zinc-200 p-4">
          <h2 className="font-semibold mb-3">Orders</h2>
          <div className="space-y-2 text-sm">
            {orders.map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 py-2">
                <span>{o.id.slice(0, 8)} · ₦{Number(o.total).toFixed(2)} · {o.status}</span>
                <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="border rounded-lg px-2 py-1">
                  {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl bg-white border border-zinc-200 p-4">
          <h2 className="font-semibold mb-3">Products</h2>
          <form onSubmit={createProduct} className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 text-sm">
            <input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="border rounded-lg px-2 py-1.5" />
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border rounded-lg px-2 py-1.5" />
            <input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (₦)" className="border rounded-lg px-2 py-1.5" />
            <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock" className="border rounded-lg px-2 py-1.5" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="border rounded-lg px-2 py-1.5" />
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="border rounded-lg px-2 py-1.5" />
            <button type="submit" className="col-span-2 md:col-span-3 rounded-lg bg-zinc-900 text-white py-2 font-medium">Add product</button>
          </form>
          <div className="space-y-2 text-sm">
            {products.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 py-2">
                <span>{p.brand} · {p.title} · ₦{Number(p.price).toFixed(2)} · stock {p.stock}</span>
                <button onClick={() => deleteProduct(p.id)} className="text-[#ff2a5a] text-xs font-medium">Delete</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
