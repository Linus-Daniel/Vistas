"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";
import { IOrder } from "@/types";
import AdminOrders from "./AdminOrder";

interface OrdersPageClientProps {
  initialOrders: IOrder[];
}

export default function RenderOrder({
  initialOrders,
}: OrdersPageClientProps) {
  const [orders, setOrders] = useState<IOrder[]>(initialOrders);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: IOrder["status"]
  ) => {
    setIsUpdating(true);

    try {
      // Update status via API
      await api.patch(`/api/orders/${orderId}`, {
        status: newStatus,
      });

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus, updatedAt: new Date() }
            : order
        )
      );

      // Optional: Show success toast
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Optional: Show error toast
      throw error; // Re-throw to let the component handle it
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewOrder = (orderId: string) => {
    // Navigate to order details page
    router.push(`/admin/orders/${orderId}`);
  };

  return (
    <AdminOrders
      orders={orders}
      onStatusUpdate={handleStatusUpdate}
      onViewOrder={handleViewOrder}
    />
  );
}
