"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "./Footer";
import Header from "./Header";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans text-gray-800">
      <SessionProvider>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </SessionProvider>
    </div>
  );
}
