"use client";

import Image from "next/image";
import { X } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";
import { CartProduct } from "@/types";

export default function CartItem({ item }: { item: CartProduct }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="relative w-20 h-20 rounded-md overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(q) => updateQuantity(item.id, q)}
          />
        </div>
      </div>
      <div className="font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
