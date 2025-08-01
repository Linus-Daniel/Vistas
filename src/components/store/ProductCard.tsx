"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "../../constant";
import { useCart } from "@/context/CartContext";
import Rating from "./Rating";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link
        href={`/store/products/${product._id}`}
        className="block relative h-48 md:h-64 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.tags?.includes("New") && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        {product.tags?.includes("Sale") && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm md:text-base font-medium mb-1 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() =>
              addToCart(product._id, 1)
            }
            className="text-blue-600 hover:text-blue-700"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
