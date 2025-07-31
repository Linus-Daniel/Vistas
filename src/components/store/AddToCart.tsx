"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Product } from "../../constant";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    // You could add a toast notification here
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-32">
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
          >
            -
          </button>
          <span className="px-3 py-1 text-center flex-1">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </button>
    </div>
  );
}
