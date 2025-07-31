"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onQuantityChange,
}: {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center border rounded-md w-fit">
      <button
        onClick={handleDecrease}
        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="px-3 w-10 text-center">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
