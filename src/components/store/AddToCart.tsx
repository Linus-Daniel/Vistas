"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Loader2 } from "lucide-react";

export function AddToCartButton({
  productId,
  className = "",
  variant = "default",
}: {
  productId: string;
  className?: string;
  variant?: "default" | "icon" | "full";
}) {
  const { addToCart } = useCart(); // Remove loading from here
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(productId, 1);
    } finally {
      setIsAdding(false);
    }
  };

  // Variant styles
  const variants = {
    default: "px-4 py-2 rounded-md",
    icon: "p-2 rounded-full",
    full: "w-full py-3 rounded-md",
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding} // Only use local isAdding state
      className={`flex items-center w-full justify-center gap-2 bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      aria-label="Add to cart"
    >
      {isAdding ? ( // Only check local isAdding state
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 hidden md:block" />
          {variant !== "icon" && <span className="text-xs">Add to Cart</span>}
        </>
      )}
    </button>
  );
}
