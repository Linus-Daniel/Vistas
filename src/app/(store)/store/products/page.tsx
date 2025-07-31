import ProductCard from "@/components/store/ProductCard";
import { products } from "../../../../constant";

export default function ProductsPage() {
  return (
    <div className="bg-white py-6 px-4 md:py-12 md:px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">All Products</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
