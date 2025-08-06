import ProductDetail from '@/components/store/ProductDetails';
import api from '@/lib/axiosInstance';
import { use } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string } >}) {
  const {id} = await params
  const response = await api.get(`/products/${id}`)
  const product = response.data
  console.log(id)
  console.log(product)

  return (
    <div>
      {/* <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p> */}
      <ProductDetail product={product}/>
    </div>
  );
}