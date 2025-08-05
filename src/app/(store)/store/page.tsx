"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";
import api from "@/lib/axiosInstance";
import { Product } from "@/types";
import Categories from "@/components/Categories";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/products");
        console.log(response.data);
        setProducts(response.data as Product[]);
      } catch (error) {
        console.log(error);
        setError("Failed to load products");
        setProducts([]); // Set empty array as fallback
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white">
        <section
          id="featured-products"
          className="py-6 px-4 md:py-12 md:px-6 lg:px-12"
        >
          <div className="container mx-auto">
            {/* Loading skeleton for categories */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-200 rounded w-24 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>

            {/* Loading skeleton for products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white">
        <section
          id="featured-products"
          className="py-6 px-4 md:py-12 md:px-6 lg:px-12"
        >
          <div className="container mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Unable to Load Products
              </h2>
              <p className="text-gray-600 mb-6">
                We're having trouble connecting to our servers. Please try again
                later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section
        id="featured-products"
        className="py-6 px-4 md:py-12 md:px-6 lg:px-12"
      >
        <div className="container mx-auto">
          <Categories products={products} />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Featured Products</h2>
            <Link
              href="/store/products"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
