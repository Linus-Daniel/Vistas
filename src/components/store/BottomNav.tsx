"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  Home,
  ShoppingCart,
  Package,
  User,
  LucideIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  showBadge?: boolean;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/store/orders", label: "Order", icon: Package },
  { href: "/store/cart", label: "Cart", icon: ShoppingCart, showBadge: true },
  { href: "/auth", label: "Profile", icon: User },
];

export default function BottomNav() {
  const { cartCount } = useCart();

  console.log(cartCount)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
      <ul className="flex justify-around items-center py-3">
        {navItems.map(({ href, label, icon: Icon, showBadge }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex flex-col items-center text-gray-600 relative"
            >
              <Icon className="h-6 w-6" />
              {showBadge && cartCount > 0 && (
                <span className="absolute -top-1 right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs mt-1">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
