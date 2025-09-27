import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id} className="border p-2 mb-2 rounded">
            <p className="font-semibold">{p.name}</p>
            <p>${p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
