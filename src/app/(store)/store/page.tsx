import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";
import api from "@/lib/axiosInstance";
import { Product } from "@/types";
import Categories from "@/components/Categories";

const getProducts = async ()=>{
   try{
    const response = await api.get("/products")
    console.log(response.data) 
    return response.data as Product[]
   }
   catch(error){
    console.log(error)
   }
}

export default async function Home() {
  const products = await getProducts()


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
