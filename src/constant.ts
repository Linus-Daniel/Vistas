export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number; // For showing discounted price
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags?: string[];
}


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
  orders: Order[]
}

export const mockUser: User = {
  id: 'user-1',
  name: 'Chidike Ojukwu',
  email: 'vandulinus@gmail.com',
  avatar: '/avatar.jpg',
  orders: [
    {
      id: 'order-1',
      date: '2023-05-15',
      status: 'delivered',
      total: 129.98,
      items: [
        {
          productId: '1',
          name: 'Premium Cotton T-Shirt',
          price: 29.99,
          quantity: 2,
          image: '/tshirt.jpg'
        },
        {
          productId: '3',
          name: 'Casual Sneakers',
          price: 79.99,
          quantity: 1,
          image: '/sneakers.jpg'
        }
      ]
    },
    {
      id: 'order-2',
      date: '2023-06-20',
      status: 'shipped',
      total: 49.99,
      items: [
        {
          productId: '2',
          name: 'Slim Fit Jeans',
          price: 49.99,
          quantity: 1,
          image: '/jeans.jpg'
        }
      ]
    }
  ]
}