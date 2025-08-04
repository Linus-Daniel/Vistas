import CheckoutSuccess from '@/components/store/Success'
import React, { Suspense } from 'react'

function page() {
  return (
    <div>
      <Suspense>
        <CheckoutSuccess />
      </Suspense>
      
    </div>
  )
}

export default page
