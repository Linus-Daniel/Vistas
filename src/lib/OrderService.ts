import Order from "@/models/Order";
interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryInfo {
  centerId?: string;
  address?: string;
  city?: string;
  zip?: string;
}

interface CreateOrderData {
  user: string;
  items: OrderItem[];
  total: number;
  paymentId: string;
  deliveryType: "pickup" | "delivery";
  deliveryInfo: DeliveryInfo;
}

export const createOrder = async (orderData: CreateOrderData) => {
  try {
    const order = new Order({
      user: orderData.user,
      items: orderData.items,
      total: orderData.total,
      paymentId: orderData.paymentId,
      status: "processing",
      deliveryType: orderData.deliveryType,
      deliveryInfo: orderData.deliveryInfo,
    });

    await order.save();
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId).populate("user", "name email");
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
};
