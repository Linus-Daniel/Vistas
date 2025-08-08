"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

// Dynamically import PaystackButton with no SSR
const PaystackButton = dynamic(
  () => import("@/components/store/PaystackButton"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-gray-200 animate-pulse rounded-md h-12 flex items-center justify-center">
        <span className="text-gray-500">Loading payment options...</span>
      </div>
    ),
  }
);

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

const CARPARKS = [
  {
    id: "carpark-1",
    name: "Alaba International Market",
    state: "Lagos",
    address: "Alaba International Market, Ojo, Lagos State",
    price: 1500,
  },
  {
    id: "carpark-2",
    name: "Onitsha Main Market",
    state: "Anambra",
    address: "Onitsha Main Market, Bridge Head, Anambra State",
    price: 2000,
  },
  {
    id: "carpark-3",
    name: "Kano Central Motor Park",
    state: "Kano",
    address: "Sabon Gari Motor Park, Kano State",
    price: 2500,
  },
  {
    id: "carpark-4",
    name: "Ibadan New Garage",
    state: "Oyo",
    address: "New Garage Motor Park, Challenge, Ibadan, Oyo State",
    price: 1800,
  },
  {
    id: "carpark-5",
    name: "Port Harcourt Mile 1 Market",
    state: "Rivers",
    address: "Mile 1 Market, Port Harcourt, Rivers State",
    price: 2200,
  },
  {
    id: "carpark-6",
    name: "Kaduna Central Market",
    state: "Kaduna",
    address: "Kaduna Central Market, Kaduna State",
    price: 2300,
  },
  {
    id: "carpark-7",
    name: "Benin Ring Road Market",
    state: "Edo",
    address: "Ring Road Market, Benin City, Edo State",
    price: 1900,
  },
  {
    id: "carpark-8",
    name: "Abuja Wuse Market",
    state: "FCT",
    address: "Wuse Market, Abuja, Federal Capital Territory",
    price: 2100,
  },
];

const DELIVERY_AGENTS = [
  {
    id: "gigl",
    name: "GIGL (GIG Logistics)",
    estimatedPrice: 1500,
    deliveryTime: "2-3 business days",
    logo: "/logos/gigl-logo.png",
  },
  {
    id: "dhl",
    name: "DHL Express",
    estimatedPrice: 3500,
    deliveryTime: "1-2 business days",
    logo: "/logos/dhl-logo.png",
  },
  {
    id: "redstar",
    name: "Red Star Express",
    estimatedPrice: 2000,
    deliveryTime: "2-4 business days",
    logo: "/logos/redstar-logo.png",
  },
  {
    id: "gokada",
    name: "Gokada",
    estimatedPrice: 1200,
    deliveryTime: "Same day (Lagos only)",
    logo: "/logos/gokada-logo.png",
  },
  {
    id: "kwik",
    name: "Kwik Delivery",
    estimatedPrice: 1000,
    deliveryTime: "Same day (Major cities)",
    logo: "/logos/kwik-logo.png",
  },
  {
    id: "ups",
    name: "UPS Nigeria",
    estimatedPrice: 4000,
    deliveryTime: "1-3 business days",
    logo: "/logos/ups-logo.png",
  },
];

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cart, cartTotal, getCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const {user} = useAuth()

  const router = useRouter();

  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery" | "carpark">(
    "delivery"
  );
  const [selectedCenter, setSelectedCenter] = useState(DELIVERY_CENTERS[0].id);
  const [selectedCarpark, setSelectedCarpark] = useState(CARPARKS[0].id);
  const [selectedAgent, setSelectedAgent] = useState(DELIVERY_AGENTS[0].id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  console.log(user)
  // Handle mounting and session data
  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  // Get selected carpark details
  const selectedCarparkDetails = CARPARKS.find(cp => cp.id === selectedCarpark);
  
  // Get selected delivery agent details
  const selectedAgentDetails = DELIVERY_AGENTS.find(agent => agent.id === selectedAgent);

  // Calculate total with delivery costs
  const getDeliveryPrice = () => {
    if (deliveryType === "carpark" && selectedCarparkDetails) {
      return selectedCarparkDetails.price;
    }
    if (deliveryType === "delivery" && selectedAgentDetails) {
      return selectedAgentDetails.estimatedPrice;
    }
    return 0;
  };

  const totalWithDelivery = cartTotal + getDeliveryPrice();

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

  const handleDeliveryTypeChange = (type: "pickup" | "delivery" | "carpark") => {
    setDeliveryType(type);
    setErrors({}); // Clear errors when switching delivery type

    if (type === "pickup" || type === "carpark") {
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
      let deliveryInfo;
      
      if (deliveryType === "pickup") {
        deliveryInfo = { centerId: selectedCenter };
      } else if (deliveryType === "carpark") {
        const carpark = CARPARKS.find(cp => cp.id === selectedCarpark);
        deliveryInfo = {
          carparkId: selectedCarpark,
          carparkName: carpark?.name,
          address: carpark?.address,
          state: carpark?.state,
          price: carpark?.price,
        };
      } else {
        const agent = DELIVERY_AGENTS.find(ag => ag.id === selectedAgent);
        deliveryInfo = {
          agentId: selectedAgent,
          agentName: agent?.name,
          deliveryPrice: agent?.estimatedPrice,
          deliveryTime: agent?.deliveryTime,
          address: formData.address.trim(),
          city: formData.city.trim(),
          zip: formData.zip.trim(),
        };
      }

      const orderData = {
        paymentId: reference.reference,
        deliveryType,
        deliveryInfo,
        totalAmount: totalWithDelivery,
        deliveryCost: getDeliveryPrice(),
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

  const handleContinueShopping = () => {
    router.push("/store");
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
            onClick={handleContinueShopping}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => handleDeliveryTypeChange("delivery")}
                  disabled={isProcessing}
                  className={`px-3 py-2 border rounded-md transition-colors text-sm ${
                    deliveryType === "delivery"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Home Delivery
                </button>
                <button
                  type="button"
                  onClick={() => handleDeliveryTypeChange("carpark")}
                  disabled={isProcessing}
                  className={`px-3 py-2 border rounded-md transition-colors text-sm ${
                    deliveryType === "carpark"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Carpark Delivery
                </button>
                <button
                  type="button"
                  onClick={() => handleDeliveryTypeChange("pickup")}
                  disabled={isProcessing}
                  className={`px-3 py-2 border rounded-md transition-colors text-sm ${
                    deliveryType === "pickup"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Store Pickup
                </button>
              </div>

              {/* Delivery Agent Selection */}
              {deliveryType === "delivery" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Delivery Agent *
                  </label>
                  <div className="space-y-2">
                    {DELIVERY_AGENTS.map((agent) => (
                      <div
                        key={agent.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedAgent === agent.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAgent(agent.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="deliveryAgent"
                              value={agent.id}
                              checked={selectedAgent === agent.id}
                              onChange={() => setSelectedAgent(agent.id)}
                              className="text-blue-600"
                            />
                            <div>
                              <h4 className="font-medium text-sm">{agent.name}</h4>
                              <p className="text-xs text-gray-500">{agent.deliveryTime}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">₦{agent.estimatedPrice.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Carpark Selection */}
              {deliveryType === "carpark" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Carpark Location *
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {CARPARKS.map((carpark) => (
                      <div
                        key={carpark.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedCarpark === carpark.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedCarpark(carpark.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="carpark"
                              value={carpark.id}
                              checked={selectedCarpark === carpark.id}
                              onChange={() => setSelectedCarpark(carpark.id)}
                              className="text-blue-600"
                            />
                            <div>
                              <h4 className="font-medium text-sm">{carpark.name}</h4>
                              <p className="text-xs text-gray-600">{carpark.state} State</p>
                              <p className="text-xs text-gray-500">{carpark.address}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">₦{carpark.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Pickup Selection */}
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

            {/* Shipping Address Form (only shown for home delivery) */}
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
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery Method Summary */}
            <div className="mb-4 p-4 bg-white rounded-md border">
              <h3 className="font-medium mb-2">Delivery Method</h3>
              {deliveryType === "pickup" ? (
                <div>
                  <p className="text-sm font-medium">Store Pickup</p>
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
                  <p className="text-sm font-medium text-green-600 mt-1">Free</p>
                </div>
              ) : deliveryType === "carpark" ? (
                <div>
                  <p className="text-sm font-medium">Carpark Delivery</p>
                  <p className="text-sm text-gray-600">
                    {selectedCarparkDetails?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedCarparkDetails?.address}
                  </p>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    ₦{selectedCarparkDetails?.price.toLocaleString()}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium">Home Delivery</p>
                  <p className="text-sm text-gray-600">
                    {selectedAgentDetails?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedAgentDetails?.deliveryTime}
                  </p>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    ₦{selectedAgentDetails?.estimatedPrice.toLocaleString()}
                  </p>
                </div>
              )}
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

            {/* Payment Button - Only render on client side */}
            <div className="mt-6">
              {isProcessing && (
                <div className="text-center text-sm text-gray-600 mb-3">
                  Processing your order...
                </div>
              )}

              {isClient && (
                <PaystackButton
                  email={formData.email}
                  amount={cartTotal}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                />
              )}

              {submitAttempted && Object.keys(errors).length > 0 && (
                <div className="mt-3 text-sm text-red-600">
                  Please correct the errors above before proceeding.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-lg font-medium text-gray-800">
              Processing payment...
            </p>
            <p className="text-sm text-gray-500">
              Please don’t close this window.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
