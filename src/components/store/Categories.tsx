"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Cpu,
  Gauge,
  Bot,
  BellElectric,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { Product } from "@/types";
import { JSX, useMemo } from "react";

interface Category {
  name: string;
  keywords: string[];
  icon: JSX.Element;
  slug: string;
}

const categories: Category[] = [
  {
    name: "Development Boards",
    keywords: [
      "arduino",
      "esp32",
      "mega",
      "uno",
      "board",
      "microcontroller",
      "starter",
      "kit",
    ],
    icon: <Cpu className="w-8 h-8" />,
    slug: "development-boards",
  },
  {
    name: "Sensors",
    keywords: [
      "sensor",
      "ultrasonic",
      "dht",
      "mq-",
      "temperature",
      "humidity",
      "gas",
      "ir",
      "motion",
      "light",
    ],
    icon: <Gauge className="w-8 h-8" />,
    slug: "sensors",
  },
  {
    name: "Motors & Robotics",
    keywords: [
      "motor",
      "servo",
      "robot",
      "chassis",
      "wheel",
      "2wd",
      "4wd",
      "l298n",
      "driver",
      "stepper",
    ],
    icon: <Bot className="w-8 h-8" />,
    slug: "motors-robotics",
  },
  {
    name: "Components",
    keywords: [
      "jumper",
      "wire",
      "capacitor",
      "resistor",
      "relay",
      "breadboard",
      "button",
      "led",
      "diode",
      "transistor",
    ],
    icon: <BellElectric className="w-8 h-8" />,
    slug: "components",
  },
  {
    name: "Tools & Accessories",
    keywords: [
      "soldering",
      "iron",
      "solder",
      "wire",
      "oled",
      "display",
      "lcd",
      "tool",
      "multimeter",
      "probe",
    ],
    icon: <Wrench className="w-8 h-8" />,
    slug: "tools-accessories",
  },
];

// Function to categorize products based on keywords
function categorizeProduct(
  product: Product,
  categories: Category[]
): string | null {
  const productText = `${product.name} ${
    product.description || ""
  }`.toLowerCase();

  for (const category of categories) {
    if (
      category.keywords.some((keyword) =>
        productText.includes(keyword.toLowerCase())
      )
    ) {
      return category.name;
    }
  }

  return null;
}

// Function to get products for a specific category
function getProductsForCategory(
  products: Product[],
  categoryName: string
): Product[] {
  return products.filter((product) => {
    const category = categories.find((cat) => cat.name === categoryName);
    if (!category) return false;

    const productText = `${product.name} ${
      product.description || ""
    }`.toLowerCase();
    return category.keywords.some((keyword) =>
      productText.includes(keyword.toLowerCase())
    );
  });
}

export default function Categories({
  products,
}: {
  products: Product[] | undefined;
}) {
  // Memoize categorized products to avoid recalculation on every render
  const categorizedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return {};

    const result: Record<string, Product[]> = {};

    categories.forEach((category) => {
      result[category.name] = getProductsForCategory(products, category.name);
    });

    return result;
  }, [products]);

  // Get featured category (Development Boards) products
  const featuredCategoryProducts =
    categorizedProducts["Development Boards"] || [];

  // Handle loading or empty state
  if (!products) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="block bg-white rounded-lg border border-gray-200 p-4 shadow-sm animate-pulse"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-3 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
        <Link
          href="/store"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((category) => {
          const categoryProducts = categorizedProducts[category.name] || [];

          return (
            <Link
              key={category.name}
              href={`/store/categories?category=${encodeURIComponent(category.slug)}`}
              className="group block bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all hover:border-blue-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors text-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {categoryProducts.length}{" "}
                  {categoryProducts.length === 1 ? "item" : "items"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured category */}
      {featuredCategoryProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Development Boards
            </h3>
            <Link
              href={`/store?category=${encodeURIComponent(
                "development-boards"
              )}`}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              See all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredCategoryProducts.slice(0, 5).map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/store/products/${product._id}`} className="block">
                  <div className="relative aspect-square mb-3 bg-gray-50 rounded-md overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-product.png";
                      }}
                    />
                  </div>
                  <h4 className="text-sm font-medium line-clamp-2 mb-1 min-h-[2.5rem]">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.stock !== undefined && (
                      <p
                        className={`text-xs ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} left`
                          : "Out of stock"}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show message if no products found */}
      {products && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available at the moment.</p>
          <p className="text-sm text-gray-400 mt-2">Please check back later.</p>
        </div>
      )}
    </section>
  );
}
