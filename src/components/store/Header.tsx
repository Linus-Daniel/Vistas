"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { cartCount } = useCart();
  const { data } = useSession();
  const user = data?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(user);
  return (
    <>
      <header className="bg-gradient-to-r from-white via-blue-50/30 to-white shadow-sm backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100/20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center space-x-3 group transition-all duration-300 ease-out"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-1 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Nascomsoft Logo"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl"
                  width={40}
                  height={40}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nascomsoft
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden md:block">
                  Premium Store
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { href: "/store", label: "Home" },
                { href: "/store/categories", label: "Categories" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-sm font-medium text-gray-600 hover:text-blue-600 transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Desktop Search Icon - Hidden on mobile */}
              <Link
                href="/store/categories"
                className="hidden md:flex p-2.5 rounded-full bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg group border border-gray-200/50"
                aria-label="Search Categories"
              >
                <Search className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
              </Link>

              {/* Cart Icon - Desktop */}
              <Link
                href="/store/cart"
                className="hidden sm:flex relative p-2.5 rounded-full bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg group border border-gray-200/50"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile/Details */}
              <Link
                href="/store/profile"
                className="flex items-center space-x-2 p-2 rounded-full bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg group border border-gray-200/50"
                aria-label="User Profile"
              >
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Image
                        src={user?.avatar as string}
                        alt={user.name || "User"}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-colors duration-300"
                        width={32}
                        height={32}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                    </div>
                    {user?.name && (
                      <span className=" md:block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 max-w-20 truncate">
                        {user.name.split(" ")[0]}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="p-1">
                    <User className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
