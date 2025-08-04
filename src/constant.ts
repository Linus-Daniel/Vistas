
// Add to existing data.ts
export interface Order {
  _id: string
  createdAt: string
  status: 'processing' | 'shipped' | 'delivered'
  total: number
  items: {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

