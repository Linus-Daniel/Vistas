"use client"
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import React, { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

function StoreProviders({ children }: { children: ReactNode }) {
  return (
    <div>
      <SessionProvider>
        <ToastContainer position="top-right" autoClose={3000} />

        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="pb-16 md:pb-0">{children}</main>
            <BottomNav />
          </CartProvider>
        </AuthProvider>
      </SessionProvider>
    </div>
  );
}

export default StoreProviders;
