"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";


interface CartItem {

  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  _id?: string;
  user: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId?: string) => Promise<void>;
  getCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth()

  // Calculate cart count and total
  const cartCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartTotal =
    cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  // Fetch cart when user logs in
  useEffect(() => {
    if (status === "authenticated") {
      getCart();
    } else if (status === "unauthenticated") {
      setCart(null);
    }
  }, [status]);

  const getCart = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };
const addToCart = async (productId: string, quantity: number = 1) => {
  if (!session?.user?.id) {
    setError("You must be logged in to add to cart");
    toast.error("You must be logged in to add to cart");
    return;
  }

  setLoading(true);
  setError(null);
  try {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add to cart");
    }

    const updatedCart = await response.json();
    setCart(updatedCart);
    toast.success("Item added to cart");
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add to cart";
    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};


  const updateQuantity = async (productId: string, quantity: number) => {
    if (user) {
      setError("You must be logged in to update cart");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update quantity"
      );
    } finally {
      setLoading(false);
    }
  };

 const removeFromCart = async (productId?: string) => {
   if (!session?.user?.id) {
     setError("You must be logged in to modify cart");
     toast.error("You must be logged in to modify cart");
     return;
   }

   setLoading(true);
   setError(null);
   try {
     const url = productId ? `/api/cart?productId=${productId}` : "/api/cart";
     const response = await fetch(url, { method: "DELETE" });

     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || "Failed to remove item");
     }

     const result = await response.json();
     setCart(result.cart || { items: [], user: session.user.id });
     toast.success("Item removed from cart");
   } catch (err) {
     const message =
       err instanceof Error ? err.message : "Failed to remove item";
     setError(message);
     toast.error(message);
   } finally {
     setLoading(false);
   }
 };


  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
