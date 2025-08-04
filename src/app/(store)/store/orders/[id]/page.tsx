"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Truck,
  Clock,
  MapPin,
  Store,
  Loader2,
} from "lucide-react";

interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryInfo {
  address?: string;
  city?: string;
  zip?: string;
  centerId?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  deliveryType: "pickup" | "delivery";
  deliveryInfo: DeliveryInfo;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

const DELIVERY_CENTERS = [
  {
    id: "center-1",
    name: "Main Store - Lagos",
    address: "123 Commerce St, Lagos",
  },
  {
    id: "center-2",
    name: "Mega Mall - Abuja",
    address: "456 Business Ave, Abuja",
  },
  {
    id: "center-3",
    name: "City Plaza - Port Harcourt",
    address: "789 Trade Blvd, Port Harcourt",
  },
];

export default function OrderDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return; // Still loading session

    if (!session) {
      router.push("/auth?callbackUrl=/orders/" + orderId);
      return;
    }

    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError("Order not found");
        } else if (response.status === 403) {
          setError("You don't have permission to view this order");
        } else {
          setError("Failed to load order details");
        }
        return;
      }

      const orderData = await response.json();
      setOrder(orderData);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("An error occurred while loading the order");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <Package className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSelectedCenter = () => {
    if (order?.deliveryType === "pickup" && order.deliveryInfo.centerId) {
      return DELIVERY_CENTERS.find(
        (center) => center.id === order.deliveryInfo.centerId
      );
    }
    return null;
  };

  const formatOrderId = (id: string) => {
    return id.slice(-8).toUpperCase(); // Show last 8 characters
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/orders"
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Order Details</h1>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <Package className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">{error}</h2>
            <p className="text-red-600 mb-4">
              The order you are looking for might not exist or you do not have
              permission to view it.
            </p>
            <Link
              href="/orders"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Order not found
            </h2>
            <Link href="/orders" className="text-blue-600 hover:text-blue-800">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedCenter = getSelectedCenter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            href="/orders"
            className="mr-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">
            Order #{formatOrderId(order._id)}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order Status Header */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                {getStatusIcon(order.status)}
                <span
                  className={`ml-2 text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              {order.deliveryType === "pickup" ? (
                <>
                  <Store className="h-5 w-5 mr-2" />
                  Pickup Information
                </>
              ) : (
                <>
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Information
                </>
              )}
            </h2>

            {order.deliveryType === "pickup" ? (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-900">
                  {selectedCenter?.name || "Pickup Location"}
                </p>
                <p className="text-blue-700 text-sm">
                  {selectedCenter?.address || "Address not available"}
                </p>
                <p className="text-blue-600 text-xs mt-2">
                  Please bring a valid ID and this order confirmation when
                  picking up your items.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-medium text-green-900">Delivery Address:</p>
                <p className="text-green-700 text-sm">
                  {order.deliveryInfo.address}
                </p>
                <p className="text-green-700 text-sm">
                  {order.deliveryInfo.city}, {order.deliveryInfo.zip}
                </p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">
              Items ({order.items.length})
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center py-4 border-b last:border-b-0"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-product.png";
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal (
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items)
                </span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {order.deliveryType === "pickup" ? "Pickup" : "Delivery"}
                </span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold text-blue-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-600">
                Payment ID:{" "}
                <span className="font-mono text-xs">{order.paymentId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/orders"
            className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Orders
          </Link>

          {order.status === "processing" && (
            <button
              onClick={() => {
                // Handle order cancellation
                if (confirm("Are you sure you want to cancel this order?")) {
                  // Add cancellation logic here
                  alert(
                    "Order cancellation functionality would be implemented here"
                  );
                }
              }}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Cancel Order
            </button>
          )}

          <button
            onClick={() => {
              // Handle reorder
              alert("Reorder functionality would be implemented here");
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reorder Items
          </button>
        </div>
      </div>
    </div>
  );
}
