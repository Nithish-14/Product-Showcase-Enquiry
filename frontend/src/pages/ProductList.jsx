import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useSearchParams } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const limit = 12;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const sp = {};
    if (search) sp.search = search;
    if (category) sp.category = category;
    if (page) sp.page = page;
    setSearchParams(sp, { replace: true });
    fetch();
  }, [search, category, page]);

  async function fetch() {
    setLoading(true);
    try {
      const res = await api.get("/products", {
        params: { search, category, page, limit },
      });
      const payload = res.data;
      setProducts(payload.data || payload.products || []);
      setTotalPages(
        payload.pagination?.totalPages ||
          Math.max(
            1,
            Math.ceil((payload.pagination?.total || payload.total || 0) / limit)
          )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-80 px-3 py-2 border rounded-md"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All categories</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Home</option>
            <option>Fitness</option>
            <option>Fashion</option>
            <option>Accessories</option>
            <option>Furniture</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Page {page} / {totalPages}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              className="px-4 py-2 border rounded-md"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>
            <div className="text-sm text-gray-700">
              Page {page} / {totalPages}
            </div>
            <button
              className="px-4 py-2 border rounded-md"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
