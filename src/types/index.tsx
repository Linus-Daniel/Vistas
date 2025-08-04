export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category:string;
  stock:number
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags?: string[];
}

