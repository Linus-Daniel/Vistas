"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Grid3X3,
  List,
  X,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface FilterState {
  category: string;
  search: string;
  sortBy: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  rating: string;
}

interface CategoryPageProps {
  initialProducts?: Product[];
  categories?: Array<{
    name: string;
    slug: string;
    count: number;
  }>;
}

const sortOptions = [
  { value: "createdAt", label: "Newest" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low)" },
  { value: "price-desc", label: "Price (High)" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "stock-desc", label: "In Stock" },
];

const categories = [
  { name: "All", slug: "all", count: 0 },
  { name: "Dev Boards", slug: "development-boards", count: 0 },
  { name: "Sensors", slug: "sensors", count: 0 },
  { name: "Robotics", slug: "motors-robotics", count: 0 },
  { name: "Components", slug: "components", count: 0 },
  { name: "Accessories", slug: "tools-accessories", count: 0 },
];

export default function CategoriesPage({
  initialProducts = [],
}: CategoryPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  // State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get("category") || "all",
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    inStock: searchParams.get("inStock") === "true",
    rating: searchParams.get("rating") || "",
  });

  // Debounced search
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Check for mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(
    async (page = 1, resetProducts = true) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filters.category && filters.category !== "all") {
          params.set("category", filters.category);
        }
        if (filters.search) {
          params.set("search", filters.search);
        }
        if (filters.sortBy) {
          params.set("sortBy", filters.sortBy);
        }
        if (filters.minPrice) {
          params.set("minPrice", filters.minPrice);
        }
        if (filters.maxPrice) {
          params.set("maxPrice", filters.maxPrice);
        }
        if (filters.inStock) {
          params.set("inStock", "true");
        }
        if (filters.rating) {
          params.set("rating", filters.rating);
        }

        params.set("page", page.toString());
        params.set("limit", "20");

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();

        if (response.ok) {
          if (resetProducts || page === 1) {
            setProducts(data.products || []);
          } else {
            setProducts((prev) => [...prev, ...(data.products || [])]);
          }
          setTotalProducts(data.pagination?.total || 0);
        } else {
          console.error("Failed to fetch products:", data.message);
          setProducts([]);
          setTotalProducts(0);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Update URL and fetch products when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all" && value !== false) {
        params.set(key, value.toString());
      }
    });

    const newUrl = `/store/categories${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(newUrl, { scroll: false });

    setCurrentPage(1);
    fetchProducts(1, true);
  }, [filters, router, fetchProducts]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle filter changes
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      search: "",
      sortBy: "createdAt",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      rating: "",
    });
    setSearchTerm("");
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product._id, 1);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage, false);
  };

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === "category") return value !== "all";
      if (key === "sortBy") return value !== "createdAt";
      if (key === "inStock") return value === true;
      return value && value.toString().trim() !== "";
    }).length;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Browse Products
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {totalProducts} products found
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative text-sm sm:text-base"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 sm:p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid3X3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 sm:p-2 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar Filters - Mobile Drawer */}
          {showFilters && isMobile && (
            <div className="fixed inset-0 z-50 bg-black/50 flex">
              <div className="bg-white w-4/5 h-full overflow-y-auto p-4 animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category.slug}
                          className="flex items-center"
                        >
                          <input
                            type="radio"
                            name="category"
                            value={category.slug}
                            checked={filters.category === category.slug}
                            onChange={(e) =>
                              updateFilter("category", e.target.value)
                            }
                            className="mr-3 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Price Range
                    </h3>
                    <div className="flex gap-2 w-full overflow-auto">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) =>
                          updateFilter("minPrice", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border w-1/4 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          updateFilter("maxPrice", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border w-1/4 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={filters.rating === rating.toString()}
                            onChange={(e) =>
                              updateFilter("rating", e.target.value)
                            }
                            className="mr-3 text-blue-500 focus:ring-blue-500"
                          />
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              & up
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) =>
                          updateFilter("inStock", e.target.checked)
                        }
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        In stock only
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Filters - Desktop */}
          {(!isMobile || !showFilters) && (
            <div
              className={`${
                showFilters && !isMobile ? "block" : "hidden"
              } lg:block w-full lg:w-64 xl:w-72 space-y-6`}
            >
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.slug} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.slug}
                          checked={filters.category === category.slug}
                          onChange={(e) =>
                            updateFilter("category", e.target.value)
                          }
                          className="mr-3 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter("minPrice", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter("maxPrice", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating.toString()}
                          onChange={(e) =>
                            updateFilter("rating", e.target.value)
                          }
                          className="mr-3 text-blue-500 focus:ring-blue-500"
                        />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            & up
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) =>
                        updateFilter("inStock", e.target.checked)
                      }
                      className="mr-3 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">In stock only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            {loading && products.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 sm:p-6 shadow-sm animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3 sm:mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3 sm:mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-5xl sm:text-6xl text-gray-300 mb-3 sm:mb-4">
                  📦
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
                      >
                        <Link
                          href={`/store/products/${product._id}`}
                          className="block"
                        >
                          <div className="relative aspect-square overflow-hidden bg-gray-50">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                  SALE
                                </div>
                              )}
                          </div>
                        </Link>

                        <div className="p-3 sm:p-4">
                          <Link href={`/store/products/${product._id}`}>
                            <h3 className="font-medium sm:font-semibold text-gray-800 line-clamp-2 mb-1 sm:mb-2 hover:text-blue-600 transition-colors text-sm sm:text-base">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="flex items-center mb-1 sm:mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                  i < (product.rating || 0)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                              ({product.reviewCount || 0})
                            </span>
                          </div>

                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className="text-sm sm:text-base font-bold text-blue-600">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice &&
                                product.originalPrice > product.price && (
                                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                            </div>
                            <span
                              className={`text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${
                                product.stock && product.stock > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.stock && product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of stock"}
                            </span>
                          </div>

                          <div className="flex gap-1.5 sm:gap-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.stock || product.stock === 0}
                              className="flex-1 bg-blue-500 text-white py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 text-xs sm:text-sm"
                            >
                              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden xs:inline">
                                Add to Cart
                              </span>
                            </button>
                            <Link
                              href={`/store/products/${product._id}`}
                              className="p-1.5 sm:p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <Link
                            href={`/store/products/${product._id}`}
                            className="sm:w-40 lg:w-48 aspect-square sm:aspect-auto"
                          >
                            <div className="relative w-full h-40 sm:h-full bg-gray-50">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-3 sm:p-4 hover:scale-105 transition-transform duration-300"
                              />
                              {product.originalPrice &&
                                product.originalPrice > product.price && (
                                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                    SALE
                                  </div>
                                )}
                            </div>
                          </Link>

                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between h-full">
                              <div className="flex-1">
                                <Link href={`/store/products/${product._id}`}>
                                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                    {product.name}
                                  </h3>
                                </Link>

                                <div className="flex items-center mb-2 sm:mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                        i < (product.rating || 0)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                                    ({product.reviewCount || 0} reviews)
                                  </span>
                                </div>

                                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                                  {product.description}
                                </p>

                                <div className="flex items-center gap-2 sm:gap-4">
                                  <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-sm sm:text-base lg:text-xl font-bold text-blue-600">
                                      ${product.price.toFixed(2)}
                                    </span>
                                    {product.originalPrice &&
                                      product.originalPrice > product.price && (
                                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                                          ${product.originalPrice.toFixed(2)}
                                        </span>
                                      )}
                                  </div>
                                  <span
                                    className={`text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${
                                      product.stock && product.stock > 0
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {product.stock && product.stock > 0
                                      ? `${product.stock} in stock`
                                      : "Out of stock"}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-3 sm:mt-4 lg:mt-0 lg:ml-4 xl:ml-6 flex flex-row lg:flex-col gap-1.5 sm:gap-2 lg:w-28 xl:w-32">
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  disabled={
                                    !product.stock || product.stock === 0
                                  }
                                  className="flex-1 lg:flex-none bg-blue-500 text-white py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 text-xs sm:text-sm"
                                >
                                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Add</span>
                                </button>
                                <Link
                                  href={`/store/products/${product._id}`}
                                  className="flex-1 lg:flex-none border border-gray-200 py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 text-gray-600 text-xs sm:text-sm"
                                >
                                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">View</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Load More */}
                {products.length < totalProducts && (
                  <div className="text-center mt-6 sm:mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      {loading ? "Loading..." : "Load More Products"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
