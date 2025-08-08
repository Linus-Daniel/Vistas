import Categories from "@/components/store/Categories";
import ProductCard from "@/components/store/ProductCard";
import api from "@/lib/axiosInstance";
import { Product } from "@/types";
import { getServers } from "dns";
import { getServerSession } from "next-auth";

const StorePage = async () => {
  try {
    // const response = await api.get("/products");
const response = await api.get("/products");
const products = response.data.products;
console.log(products.length)
const session = await getServerSession()



    return (
      <div className="container mx-auto">
        <Categories products={products} />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Featured Products</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products?.map((product:Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Failed to load products.</div>;
  }
};

export default StorePage;
