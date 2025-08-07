import React from "react";
import { getServerSession } from "next-auth";
import OrdersPage from "@/components/store/OrdersPage";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";

async function getOrders() {
  try {
    const cookiesStore = await cookies();

    // Convert cookies to proper format
    const cookieHeader = cookiesStore.toString();

    const response = await api.get("/orders", {
      headers: {
        Cookie: cookieHeader, // Use 'Cookie' header name
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function page() {
  const session = await getServerSession();
  const user = session?.user;

  const ordersData = await getOrders();

  return (
    <div>
      <OrdersPage orders={ordersData} />
    </div>
  );
}

export default page;
