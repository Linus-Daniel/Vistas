"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuantitySelector from "@/components/store/QuantitySelector";
import { Product } from "@/types";
import api from "@/lib/axiosInstance";
import { AddToCartButton } from "@/components/store/AddToCart";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-8 inline-block"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-red-500">Failed to load product details.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <motion.div variants={itemVariants} className="relative">
          {loading ? (
            <Skeleton className="w-full aspect-square rounded-2xl" />
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-square overflow-hidden shadow-lg">
              <Image
                src={product?.image || "/placeholder-product.jpg"}
                alt={product?.name || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
              />
            </div>
          )}
        </motion.div>

        {/* Product Info Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          {loading ? (
            <>
              <Skeleton className="h-10 w-4/5" />
              <Skeleton className="h-8 w-2/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-8 space-y-4">
                <Skeleton className="h-12 w-3/5" />
              </div>
            </>
          ) : (
            <>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-gray-900"
              >
                {product?.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-semibold text-blue-600"
              >
                ${product?.price.toFixed(2)}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-700 leading-relaxed"
              >
                {product?.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-6"
              >
                <AddToCartButton
                  productId={product?._id as string}
                  // quantity={quantity}
                  // className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
