import React, { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../Services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      setForm({ name: "", description: "", price: "", stock: "" });
      fetchProducts();
    } catch {
      setError("Failed to create product (only admin can create)");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch {
      setError("Delete failed (admin only)");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <p className="text-red-600">{error}</p>}

      {/* Product Form */}
      <form onSubmit={handleCreate} className="space-y-4 mb-6">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Add Product</button>
      </form>

      {/* Product List */}
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="p-4 border flex justify-between">
            <div>
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.description}</p>
              <p>${p.price} | Stock: {p.stock}</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-4 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
