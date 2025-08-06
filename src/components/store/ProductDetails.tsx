"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { IProduct } from "@/models/Product";
import { AddToCartButton } from "./AddToCart";

interface Specification {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string; 
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specifications?: Specification[];
  category: string;
  sku: string;
}


export default function ProductDetail({product}:{product:IProduct}) {
  const [quantity, setQuantity] = useState(1);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);


  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const displaySpecs = showAllSpecs
    ? product.specifications
    : product.specifications?.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span> / <span>{product.category}</span> /{" "}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-sm overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain p-8"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating as number)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₦{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₦{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save ₦{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                )}
                <p className="text-sm text-gray-600 mt-2">SKU: {product.sku}</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4"></div>

              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton productId={product._id as string} />
                <button
                  onClick={handleWishlist}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-300 bg-white text-gray-600 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>

                <button className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-600 hover:text-gray-800 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Specifications
                  </h3>
                  {product.specifications.length > 6 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showAllSpecs ? "Show Less" : "Show All"}
                      {showAllSpecs ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                  {displaySpecs?.map(
                    (spec: { label: string; value: string }, index: number) => (
                      <div
                        key={index}
                        className={`flex flex-col sm:flex-row sm:items-center px-4 py-3 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <div className="sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                          {spec.label}
                        </div>
                        <div className="sm:w-2/3 text-sm text-gray-900">
                          {spec.value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
