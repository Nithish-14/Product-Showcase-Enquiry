import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/product/${product.id}`);
      }}
      className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
    >
      <div className="h-44 w-full rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.short_desc}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-accent font-semibold">₹{product.price}</div>
        <button className="text-sm px-3 py-1 bg-primary text-white rounded-md">
          View
        </button>
      </div>
    </article>
  );
}
