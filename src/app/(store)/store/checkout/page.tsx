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
  const { cart, cartTotal, getCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

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

  // Validation functions
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email address"
          : "";
      case "address":
        return deliveryType === "delivery" && value.trim().length < 5
          ? "Address must be at least 5 characters"
          : "";
      case "city":
        return deliveryType === "delivery" && value.trim().length < 2
          ? "City must be at least 2 characters"
          : "";
      case "zip":
        return deliveryType === "delivery" && value.trim().length < 3
          ? "ZIP code must be at least 3 characters"
          : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Always validate name and email
    newErrors.name = validateField("name", formData.name);
    newErrors.email = validateField("email", formData.email);

    // Validate delivery fields only if delivery type is selected
    if (deliveryType === "delivery") {
      newErrors.address = validateField("address", formData.address);
      newErrors.city = validateField("city", formData.city);
      newErrors.zip = validateField("zip", formData.zip);
    }

    // Remove empty error messages
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDeliveryTypeChange = (type: "pickup" | "delivery") => {
    setDeliveryType(type);
    setErrors({}); // Clear errors when switching delivery type

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

  const handlePaymentClose = () => {
    alert("Payment was not completed. Please try again.");
    setIsProcessing(false);
  };

  const handlePaymentSuccess = async (reference: any) => {
    setIsProcessing(true);

    try {
      const orderData = {
        paymentId: reference.reference,
        deliveryType,
        deliveryInfo:
          deliveryType === "pickup"
            ? { centerId: selectedCenter }
            : {
                address: formData.address.trim(),
                city: formData.city.trim(),
                zip: formData.zip.trim(),
              },
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Handle specific error cases
        if (res.status === 400 && responseData.issues) {
          alert(`Order failed: ${responseData.issues.join(", ")}`);
        } else if (res.status === 429) {
          alert("Too many requests. Please wait a moment and try again.");
        } else {
          alert(
            responseData.message || "Order creation failed. Please try again."
          );
        }
        return;
      }

      // Refresh cart to reflect the cleared state
      await getCart();

      // Redirect to success page
      router.push(`/store/checkout/success?orderId=${responseData._id}`);
    } catch (error) {
      console.error("Order processing error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentInitiate = () => {
    setSubmitAttempted(true);

    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return false;
    }

    if (!cart || cart.items.length === 0) {
      alert("Your cart is empty.");
      return false;
    }

    setIsProcessing(true);
    return true;
  };

  if (!session) {
    router.push("/auth?callbackUrl=/checkout");
    return null;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-4">
            Add some items to your cart before checking out.
          </p>
          <button
            onClick={() => router.push("/store")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
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
                  disabled={isProcessing}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    deliveryType === "delivery"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Delivery to Address
                </button>
                <button
                  type="button"
                  onClick={() => handleDeliveryTypeChange("pickup")}
                  disabled={isProcessing}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    deliveryType === "pickup"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
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
                    Select Pickup Location *
                  </label>
                  <select
                    id="delivery-center"
                    value={selectedCenter}
                    onChange={(e) => setSelectedCenter(e.target.value)}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
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

            {/* Contact Information Form */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Shipping Address Form (only shown for delivery) */}
            {deliveryType === "delivery" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Address</h3>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isProcessing}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      disabled={isProcessing}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      disabled={isProcessing}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 ${
                        errors.zip ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Order items list */}
            <div className="space-y-4 mb-6">
              {cart?.items.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-4">
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
                <div>
                  <p className="text-sm font-medium">Pick Up</p>
                  <p className="text-sm text-gray-600">
                    {
                      DELIVERY_CENTERS.find((c) => c.id === selectedCenter)
                        ?.name
                    }
                  </p>
                  <p className="text-sm text-gray-500">
                    {
                      DELIVERY_CENTERS.find((c) => c.id === selectedCenter)
                        ?.address
                    }
                  </p>
                </div>
              ) : (
                <p className="text-sm">Delivery to Address</p>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-6">
              {isProcessing && (
                <div className="text-center text-sm text-gray-600 mb-3">
                  Processing your order...
                </div>
              )}

              <PaystackButton
                email={formData.email}
                amount={cartTotal}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                // disabled={isProcessing}
                // onBeforeInitiate={handlePaymentInitiate}
              />

              {submitAttempted && Object.keys(errors).length > 0 && (
                <div className="mt-3 text-sm text-red-600">
                  Please correct the errors above before proceeding.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
