"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function AddToCartButton({
  productId,
  initialQuantity = 1,
}: {
  productId: string;
  initialQuantity?: number;
}) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleAddToCart = async () => {
    await addToCart(productId, quantity);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center border rounded">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-2 py-1"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)} className="px-2 py-1">
          +
        </button>
      </div>
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
