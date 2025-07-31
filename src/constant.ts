export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For showing discounted price
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    description: "Soft premium cotton t-shirt for everyday wear",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/68f65dd572-ce90196c1a6e7b86e8a4.png",
    rating: 4.5,
    reviewCount: 24,
    tags: ["New"],
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 49.99,
    description: "Comfortable slim fit jeans with stretch technology",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/5a3002d8d2-54aa359ae732cc86fec2.png",
    rating: 5,
    reviewCount: 42,
  },
  {
    id: "3",
    name: "Casual Sneakers",
    price: 79.99,
    originalPrice: 99.99,
    description: "Lightweight sneakers for all-day comfort",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/378f18d336-6a75d33dec20bfa38304.png",
    rating: 4,
    reviewCount: 18,
    tags: ["Sale"],
  },
  {
    id: "4",
    name: "Classic Wristwatch",
    price: 129.99,
    description: "Elegant timepiece with leather strap",
    image: "/watch.jpg",
    rating: 4.8,
    reviewCount: 36,
  },
  // Add more products as needed
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

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