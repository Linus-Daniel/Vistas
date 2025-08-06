"use client";

import Link from "next/link";
import { Product } from "@/types";
import Rating from "./Rating";
import Image from "next/image";
import { AddToCartButton } from "./AddToCart";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-primary-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link
        href={`/store/products/${product._id}`}
        className="block relative h-40 sm:h-48 md:h-56 overflow-hidden p-2"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-contain"
          priority={false}
        />
        {product.tags?.includes("New") && (
          <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
            New
          </span>
        )}
        {product.tags?.includes("Sale") && (
          <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
            Sale
          </span>
        )}
      </Link>
      <div className="p-2 sm:p-3">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-xs sm:text-sm font-medium mb-1 hover:text-blue-600 transition line-clamp-2 h-10 overflow-hidden">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-row-reverse justify-between items-center mb-1 sm:mb-2">
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="text-right">
            <span className="font-semibold text-sm sm:text-base">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-1">
                ₦{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center pt-1">
          <AddToCartButton productId={product._id} />
        </div>
      </div>
    </div>
  );
}
