"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";


export default function Header() {
  const { totalItems } = useCart();
  const {user} = useAuth()

  return (
    <header className="hidden md:block bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ShopEasy
            </Link>
            <nav className="flex space-x-8">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/products" className="hover:text-blue-600 transition">
                Shop
              </Link>
              <Link href="#" className="hover:text-blue-600 transition">
                Categories
              </Link>
              <Link href="#" className="hover:text-blue-600 transition">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/profile">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
