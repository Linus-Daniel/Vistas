import SuspenseWrapper from "@/components/store/SuspenseWrapper";
import api from "@/lib/axiosInstance";

async function getProducts() {
  try {
    const response = await api.get("/products");
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();
    if (!products || products.length === 0) {
        return <div>No products available.</div>;
    }

  return (
    <div>
       <SuspenseWrapper products={products} />
    </div>
  );
}
