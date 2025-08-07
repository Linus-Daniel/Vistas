import AdminProducts from '@/components/admin/ProductPage'
import api from '@/lib/axiosInstance'
import React from 'react'

const getProducts = async ()=>{

  try {
    const response = await api.get("/products")
    const data = response.data.products
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }

}

async function page() {
  const products =  await getProducts()
  return (
    <div>
      <AdminProducts initialProducts={products} />
      
    </div>
  )
}

export default page
