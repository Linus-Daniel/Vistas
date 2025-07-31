"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "../../../../../constant";
import QuantitySelector from "@/components/store/QuantitySelector";
import AddToCartButton from "@/components/store/AddToCart";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);
  if (!product) return notFound();

  const [quantity, setQuantity] = useState(1); // ⬅️ Add this line

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
          <AddToCartButton product={product}  />{" "}
          {/* Updated */}
        </div>
      </div>
    </div>
  );
}
