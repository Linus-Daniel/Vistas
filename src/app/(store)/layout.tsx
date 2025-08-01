import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/store/Header";
import BottomNav from "@/components/store/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import StoreProviders from "@/components/store/StoreProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopEasy - Your Online Store",
  description: "Find the best products at great prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <StoreProviders>{children}</StoreProviders>
      </body>
    </html>
  );
}
