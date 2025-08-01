
// Add to existing data.ts
export interface Order {
  id: string
  date: string
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

