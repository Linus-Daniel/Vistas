import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import { products } from "../../../constant";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white">
      <section
        id="featured-products"
        className="py-6 px-4 md:py-12 md:px-6 lg:px-12"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Featured Products</h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
