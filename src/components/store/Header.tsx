"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Header() {
  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="bg-primary-100 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
      
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-xl flex items-center font-bold text-blue-600">
            <Image src={"/images/logo.png"} alt="logo" className="w-12 h-12" width={200} height={200}/>
            <p className="hidden md:block">
              Nascomsoft
              </p>
            </Link>

            {/* Navigation (hidden on mobile) */}
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link href="/store" className="hover:text-blue-600 transition">
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

          {/* Right Side - Search + Icons */}
          <div className="flex items-center space-x-4">
            {/* Search - Always visible */}
            <div className="relative w-36 sm:w-48 md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 bg-white  border-primary-300 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Cart Icon - Hidden on mobile */}
            <Link
              href="/store/cart"
              className="relative hidden sm:inline-block"
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon - Always visible */}
            <Link href="/store/profile" aria-label="Profile">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
