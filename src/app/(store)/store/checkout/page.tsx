"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import PaystackButton from "@/components/store/PaystackButton";

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

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cart, totalPrice, clearCart, createOrder } = useCart();
  const router = useRouter();

  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    "delivery"
  );
  const [selectedCenter, setSelectedCenter] = useState(DELIVERY_CENTERS[0].id);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryTypeChange = (type: "pickup" | "delivery") => {
    setDeliveryType(type);
    // Reset address fields if switching to pickup
    if (type === "pickup") {
      setFormData((prev) => ({
        ...prev,
        address: "",
        city: "",
        zip: "",
      }));
    }
  };

  const handlePaymentSuccess = async (reference: any) => {
    try {
      const orderData = {
        deliveryType,
        deliveryCenter: deliveryType === "pickup" ? selectedCenter : null,
        shippingAddress:
          deliveryType === "delivery"
            ? {
                address: formData.address,
                city: formData.city,
                zip: formData.zip,
              }
            : null,
      };

      const order =  await createOrder(orderData);

      // Save payment reference to order
      await fetch(`/api/orders/${order?._id }/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: reference.reference,
          status: "paid",
          deliveryInfo: orderData,
        }),
      });

      alert(
        `Payment successful! Your order has been placed. ${
          deliveryType === "pickup"
            ? "You will receive pickup instructions via email."
            : ""
        }`
      );
      clearCart();
      router.push("/orders");
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Order creation failed. Please contact support.");
    }
  };

  const handlePaymentClose = () => {
    alert("Payment was not completed");
  };

  if (!session) {
    router.push("/auth?callbackUrl=/checkout");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Delivery Type Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Delivery Method</h2>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => handleDeliveryTypeChange("delivery")}
                  className={`px-4 py-2 border rounded-md ${
                    deliveryType === "delivery"
                      ? "bg-blue-100 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  Delivery to Address
                </button>
                <button
                  type="button"
                  onClick={() => handleDeliveryTypeChange("pickup")}
                  className={`px-4 py-2 border rounded-md ${
                    deliveryType === "pickup"
                      ? "bg-blue-100 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  Pick Up In Store
                </button>
              </div>

              {deliveryType === "pickup" && (
                <div className="mt-4">
                  <label
                    htmlFor="delivery-center"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Pickup Location
                  </label>
                  <select
                    id="delivery-center"
                    value={selectedCenter}
                    onChange={(e) => setSelectedCenter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {DELIVERY_CENTERS.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.name} - {center.address}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Shipping Address Form (only shown for delivery) */}
            {deliveryType === "delivery" && (
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Order items list */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-4"
                >
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery Method Summary */}
            <div className="mb-4 p-4 bg-white rounded-md border">
              <h3 className="font-medium mb-2">Delivery Method</h3>
              {deliveryType === "pickup" ? (
                <p className="text-sm">
                  Pick Up:{" "}
                  {DELIVERY_CENTERS.find((c) => c.id === selectedCenter)?.name}
                </p>
              ) : (
                <p className="text-sm">Delivery to Address</p>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <PaystackButton
                email={formData.email}
                amount={totalPrice}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                // disabled={
                //   deliveryType === "delivery" &&
                //   (!formData.address || !formData.city || !formData.zip)
                // }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
