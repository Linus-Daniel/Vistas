"use client";

import { usePaystackPayment } from "react-paystack";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface PaystackButtonProps {
  email: string;
  amount: number; // Amount in Naira
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

export default function PaystackButton({
  email,
  amount,
  onSuccess,
  onClose,
}: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);

  const config = {
    reference: `${Date.now()}`,
    email,
    amount: amount * 100, // Paystack uses Kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccessCallback = (reference: any) => {
    setLoading(false);
    onSuccess(reference);
  };

  const onCloseCallback = () => {
    setLoading(false);
    onClose();
  };

  const handlePayment = () => {
    if (!config.publicKey) {
      console.error("Missing Paystack public key");
      return;
    }

    setLoading(true);
    initializePayment({
      onSuccess: onSuccessCallback,
      onClose: onCloseCallback,
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-70"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" size={18} />
          Processing...
        </span>
      ) : (
        "Pay with Paystack"
      )}
    </button>
  );
}
