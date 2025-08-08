import React, { Suspense } from 'react'
import CategoriesPage from './CategoriesPage'
import { Product } from '@/types'

function SuspenseWrapper({products}: { products: Product[] }) {
  return (
    <Suspense>

        
        <CategoriesPage initialProducts={products} />
    </Suspense>
  )
}

export default SuspenseWrapper