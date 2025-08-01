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
  const { cart, cartTotal} = useCart();
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryTypeChange = (type: "pickup" | "delivery") => {
    setDeliveryType(type);
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
  setIsProcessing(true);
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: reference.reference,
        deliveryType,
        deliveryInfo:
          deliveryType === "pickup"
            ? { centerId: selectedCenter }
            : {
                address: formData.address,
                city: formData.city,
                zip: formData.zip,
              },
      }),
    });

    if (!res.ok) throw new Error("Order creation failed");

    const order = await res.json();

    router.push(`/checkout/success?orderId=${order._id}`);
  } catch (error) {
    console.error("Order processing error:", error);
    router.push("/checkout/error");
  } finally {
    setIsProcessing(false);
  }
};


  const handlePaymentClose = () => {
    alert("Payment was not completed. You can try again.");
  };

  if (!session) {
    router.push("/auth?callbackUrl=/checkout");
    return null;
  }

  // Validate form for delivery
  const isFormValid =
    deliveryType === "pickup" ||
    (formData.name &&
      formData.email &&
      formData.address &&
      formData.city &&
      formData.zip);

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

            {/* Shipping Address Form */}
            {deliveryType === "delivery" && (
              <form className="space-y-4">
                {/* Form fields remain the same */}
                {/* ... */}
              </form>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Order items list */}
            <div className="space-y-4 mb-6">
              {cart?.items.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-4">
                  {/* Item display remains the same */}
                  {/* ... */}
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
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              {/* Payment Button */}
              <div className="mt-6">
                <PaystackButton
                  email={formData.email}
                  amount={cartTotal}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
