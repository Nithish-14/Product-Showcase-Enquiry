import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import EnquiryModal from "../components/EnquiryModal";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch();
  }, [id]);

  async function fetch() {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;
  if (!product)
    return <div className="text-center text-gray-600">Product not found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="rounded-xl overflow-hidden bg-white shadow-sm">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-accent font-semibold text-lg mt-2">
          ₹{product.price}
        </div>
        <p className="text-gray-600 mt-3">{product.short_desc}</p>
        <p className="mt-4 text-gray-700">{product.long_desc}</p>

        <div className="mt-6">
          <button
            onClick={() => setShow(true)}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {show && (
        <EnquiryModal productId={product.id} onClose={() => setShow(false)} />
      )}
    </div>
  );
}
