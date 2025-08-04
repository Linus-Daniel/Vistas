"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import api from "@/lib/axiosInstance";
import { AddToCartButton } from "@/components/store/AddToCart";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Truck, Shield, RefreshCw } from "lucide-react";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("Product ID is required");
        }

        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        setError(
          error.response?.data?.message || "Failed to load product details"
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // Reset quantity when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  // Animation variants with proper types
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier easing
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const priceVariants: Variants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
        delay: 0.3,
      },
    },
  };

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl p-8"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Product Not Found
            </h2>
            <p className="text-red-500 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {typeof window !== "undefined" && (
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
              )}

              <Link
                href="/store"
                className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      {/* Breadcrumb */}
      <motion.div variants={itemVariants} className="mb-6">
        <Link
          href="/store"
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Image Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          {loading ? (
            <Skeleton className="w-full aspect-square rounded-2xl" />
          ) : (
            <motion.div
              variants={imageVariants}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-square overflow-hidden shadow-lg"
            >
              <Image
                src={product?.image || "/placeholder-product.jpg"}
                alt={product?.name || "Product image"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-product.jpg";
                }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Product Info Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-4/5" />
              <Skeleton className="h-8 w-2/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-8 space-y-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ) : (
            <>
              {/* Product Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
              >
                {product?.name}
              </motion.h1>

              {/* Price */}
              <motion.div
                variants={priceVariants}
                className="flex items-center space-x-4"
              >
                <p className="text-3xl lg:text-4xl font-bold text-blue-600">
                  ${product?.price.toFixed(2)}
                </p>
                {product?.stock !== undefined && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 0
                        ? product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0
                      ? product.stock > 10
                        ? "In Stock"
                        : `Only ${product.stock} left`
                      : "Out of Stock"}
                  </span>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="prose prose-gray max-w-none"
              >
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product?.description ||
                    "No description available for this product."}
                </p>
              </motion.div>

              {/* Features/Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6"
              >
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  <span>30-Day Returns</span>
                </div>
              </motion.div>

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                
              </motion.div>

              {/* Add to Cart Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-6 space-y-4"
              >
                <AddToCartButton
                  productId={product?._id as string}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                />

                {(!product?.stock || product.stock === 0) && (
                  <p className="text-red-600 text-sm text-center">
                    This item is currently out of stock
                  </p>
                )}
              </motion.div>

              {/* Additional Product Info */}
              {product?.category && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="pt-6 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Category:</span>{" "}
                    {product.category}
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
