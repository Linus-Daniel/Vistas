import React from "react";
import { getServerSession } from "next-auth";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import RenderOrder from "@/components/admin/OrderWrapper";
import Order from "@/models/Order";

async function getOrders() {
  const session = await getServerSession();
  const user = session?.user;
  try {
    const cookiesStore = await cookies();
    const cookieHeader = cookiesStore.toString();

    if (user?.role != "admin") {
      return;
    }

    const orderData = Order.find({});
    console.log(orderData, "my orders");
    // orders = orderData

    // const response = await api.get("/orders", {
    //   headers: {
    //     Cookie: cookieHeader,
    //   },
    // });

    // return response.data;
  
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function page() {
  const session = await getServerSession();
  const user = session?.user;
  const ordersData = await getOrders();
  
  // Check if user is admin (adjust this logic based on your auth setup)
  if (!session || !user) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
          <p className="text-gray-600">
            Please log in to access the orders page.
          </p>
        </div>
      </div>
    );
  }


  // console.log(ordersData);

  return (
    <div>
      {/* <RenderOrder initialOrders={ordersData} /> */}
    </div>
  );
}

export default page;
