"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cart,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
  } = useCart();
  const router = useRouter()

  if (loading) return <div>Loading your cart...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount})</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.items.map((item) => (
              <div
                key={item.product}
                className="flex items-center border-b py-4 gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product, Number(e.target.value))
                    }
                    className="border rounded p-1"
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(item.product)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <Button variant="destructive" onClick={() => removeFromCart()}>
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="border p-4 rounded h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button onClick={()=>router.push("/store/checkout")} className="w-full mt-6">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
