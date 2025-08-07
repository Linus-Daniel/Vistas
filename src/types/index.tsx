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


interface IOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface IDeliveryInfo {
  address?: string;
  city?: string;
  zip?: string;
  centerId?: string;
  centerName?: string;
  centerAddress?: string;
}

export interface IOrder {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  paymentId: string;
  items: IOrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "completed" | "failed";
  deliveryType: "delivery" | "pickup";
  deliveryInfo: IDeliveryInfo;
  createdAt: Date | string;
  updatedAt: Date | string;
}
