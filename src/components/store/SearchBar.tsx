"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, SortAsc, X, ChevronDown } from "lucide-react";

// --------------------
// 🧾 TYPES
// --------------------
interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  rating: number;
  reviewCount: number;
  images?: string[];
  category: string;
}

interface Pagination {
  total: number;
  page: number;
  pages: number;
}

interface Option {
  value: string;
  label: string;
}



// --------------------
// 🔁 Debounce Hook
// --------------------
function useDebounce<T>(callback: (...args: T[]) => void, delay: number) {
  return useCallback(
    (...args: T[]) => {
      const handler = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(handler);
    },
    [callback, delay]
  );
}

// --------------------
// 🔍 Product Search Bar
// --------------------
const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pages: 1,
  });

  const fetchProducts = useCallback(
    async (search: string, cat: string, sort: string, pageNum = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: "12",
        });

        if (search) params.append("search", search);
        if (cat !== "all") params.append("category", cat);
        if (sort) params.append("sortBy", sort);

        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();

        if (res.ok) {
          setProducts(
            pageNum === 1
              ? data.products
              : (prev) => [...prev, ...data.products]
          );
          setPagination(data.pagination);
        } else {
          console.error("Fetch error:", data.message);
          setProducts([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );


  // 🚀 On mount
  useEffect(() => {
    fetchProducts("", "all", "createdAt", 1);
  }, [fetchProducts]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setCategory("all");
    setSortBy("createdAt");
    setPage(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(searchTerm, category, sortBy, nextPage);
  };

  // --------------------
  // 🧱 JSX Return
  // --------------------
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Search Panel */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="p-4 space-y-4">
          {/* Search Field */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, tags, SKU..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="md:hidden flex items-center justify-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown
                className={`h-4 w-4 ml-2 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>


          
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {loading ? "Searching..." : `${pagination.total} Products Found`}
          </h3>
          {pagination.total > 0 && (
            <span className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.pages}
            </span>
          )}
        </div>

        <div className="p-4">
          {loading ? (
            <SkeletonGrid />
          ) : products.length > 0 ? (
            <>
              <ProductGrid products={products} />
              {pagination.page < pagination.pages && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState onClear={handleClearSearch} />
          )}
        </div>
      </div>
    </div>
  );
};



const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="bg-gray-100 animate-pulse h-48 rounded-lg"></div>
    ))}
  </div>
);

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.map((product) => (
      <div
        key={product._id}
        className="border border-gray-200 rounded-lg p-4 hover:shadow-md"
      >
        <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="text-4xl">📦</div>
          )}
        </div>
        <h4 className="font-semibold mb-1 line-clamp-2">{product.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-green-600">${product.price}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        {product.rating > 0 && (
          <div className="mt-2 flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm ml-1 text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        )}
      </div>
    ))}
  </div>
);

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-lg font-medium mb-2">No products found</h3>
    <p className="text-gray-600 mb-4">
      Try adjusting your search terms or filters
    </p>
    <button
      onClick={onClear}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Clear Search
    </button>
  </div>
);

export default SearchBar;
