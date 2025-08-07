"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/store", label: "Home", icon: Home },
  { href: "/store/orders", label: "Order", icon: Package },
  { href: "/store/cart", label: "Cart", icon: ShoppingCart, showBadge: true },
  { href: "/store/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const { cartCount } = useCart();
  const pathname = usePathname();

  console.log(cartCount);

  // Get dynamic background based on active route
  const getNavBackground = () => {
    switch (pathname) {
      case '/':
        return 'from-blue-400/20 via-purple-400/10 to-pink-400/20';
      case '/store/orders':
        return 'from-emerald-400/20 via-teal-400/10 to-cyan-400/20';
      case '/store/cart':
        return 'from-orange-400/20 via-red-400/10 to-pink-400/20';
      case '/store/profile':
        return 'from-purple-400/20 via-indigo-400/10 to-blue-400/20';
      default:
        return 'from-gray-400/20 via-slate-400/10 to-gray-400/20';
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${getNavBackground()}
        transition-all duration-700 ease-in-out animate-pulse
      `} />
      
      {/* Moving orbs background */}
      <div className="absolute inset-0">
        <div className={`
          absolute top-0 left-1/4 w-20 h-20 rounded-full blur-xl opacity-30
          bg-gradient-to-r ${getNavBackground()}
          animate-bounce transition-all duration-1000 ease-in-out
        `} style={{ animationDuration: '3s' }} />
        <div className={`
          absolute bottom-0 right-1/4 w-16 h-16 rounded-full blur-xl opacity-20
          bg-gradient-to-l ${getNavBackground()}
          animate-bounce transition-all duration-1000 ease-in-out
        `} style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>
      
      {/* Main nav content */}
      <div className="relative bg-white/70 backdrop-blur-lg border-t border-white/30 shadow-xl">
        <ul className="flex justify-around items-center py-2 px-4 relative">
        {navItems.map(({ href, label, icon: Icon, showBadge }, index) => {
          const isActive = pathname === href;
          
          // Get item-specific colors
          const getItemColors = () => {
            if (isActive) {
              switch (href) {
                case '/':
                  return 'text-blue-600 bg-gradient-to-br from-blue-100/80 to-purple-100/60 shadow-blue-200/50';
                case '/store/orders':
                  return 'text-emerald-600 bg-gradient-to-br from-emerald-100/80 to-teal-100/60 shadow-emerald-200/50';
                case '/store/cart':
                  return 'text-orange-600 bg-gradient-to-br from-orange-100/80 to-red-100/60 shadow-orange-200/50';
                case '/store/profile':
                  return 'text-purple-600 bg-gradient-to-br from-purple-100/80 to-indigo-100/60 shadow-purple-200/50';
                default:
                  return 'text-gray-600 bg-gradient-to-br from-gray-100/80 to-slate-100/60 shadow-gray-200/50';
              }
            }
            return 'text-gray-500 hover:text-gray-700 hover:bg-white/60';
          };
          
          return (
            <li key={index} className="flex-1">
              <Link
                href={href}
                className={`
                  flex flex-col items-center relative py-2 px-3 rounded-2xl
                  transition-all duration-500 ease-out group
                  ${isActive 
                    ? `${getItemColors()} scale-105 shadow-lg animate-pulse` 
                    : `${getItemColors()} hover:scale-102 hover:shadow-md`
                  }
                `}
                style={{
                  animationDuration: isActive ? '2s' : undefined,
                }}
              >
                {/* Icon container with scale animation */}
                <div className={`
                  relative transition-all duration-300 ease-out
                  ${isActive ? 'transform -translate-y-0.5' : 'group-hover:scale-110'}
                `}>
                  <Icon className={`
                    h-6 w-6 transition-all duration-300 ease-out
                    ${isActive ? 'scale-110' : ''}
                  `} />
                  
                  {/* Badge with enhanced animation */}
                  {showBadge && cartCount > 0 && (
                    <span className={`
                      absolute -top-2 -right-2 
                      bg-gradient-to-r from-red-500 via-red-600 to-red-700
                      text-white text-xs font-bold rounded-full h-5 w-5 
                      flex items-center justify-center shadow-lg
                      animate-bounce transition-all duration-500 ease-out
                      hover:scale-110 hover:shadow-red-300/50
                      ${cartCount > 99 ? 'scale-110 animate-pulse' : ''}
                      ${isActive ? 'shadow-red-400/60 animate-pulse' : ''}
                    `}>
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>

                {/* Label with fade and slide animation */}
                <span className={`
                  text-xs mt-1 font-medium transition-all duration-300 ease-out
                  ${isActive 
                    ? 'opacity-100 transform translate-y-0 text-blue-600' 
                    : 'opacity-70 transform translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0'
                  }
                `}>
                  {label}
                </span>

                {/* Active indicator with animated glow */}
                {isActive && (
                  <>
                    <div className={`
                      absolute -bottom-1 w-2 h-2 rounded-full animate-pulse
                      ${href === '/' ? 'bg-blue-600 shadow-blue-400/50' :
                        href === '/store/orders' ? 'bg-emerald-600 shadow-emerald-400/50' :
                        href === '/store/cart' ? 'bg-orange-600 shadow-orange-400/50' :
                        href === '/store/profile' ? 'bg-purple-600 shadow-purple-400/50' : 'bg-gray-600'
                      }
                      shadow-lg
                    `} />
                    <div className={`
                      absolute -bottom-1 w-1 h-1 rounded-full animate-ping
                      ${href === '/' ? 'bg-blue-400' :
                        href === '/store/orders' ? 'bg-emerald-400' :
                        href === '/store/cart' ? 'bg-orange-400' :
                        href === '/store/profile' ? 'bg-purple-400' : 'bg-gray-400'
                      }
                    `} />
                  </>
                )}
              </Link>
            </li>
          );
        })}
        </ul>
        {/* Enhanced sliding indicator with gradient */}
        <div className={`
          absolute bottom-0 left-0 h-1 rounded-full transition-all duration-700 ease-out
          ${pathname === '/' ? 
            'w-1/4 translate-x-0 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500' :
            pathname === '/store/orders' ? 
            'w-1/4 translate-x-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500' :
            pathname === '/store/cart' ? 
            'w-1/4 translate-x-[200%] bg-gradient-to-r from-orange-500 via-red-500 to-pink-500' :
            pathname === '/store/profile' ? 
            'w-1/4 translate-x-[300%] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500' : 
            'w-0'
          }
          shadow-lg animate-pulse
        `} />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 rounded-full opacity-40
                ${pathname === '/' ? 'bg-blue-400' :
                  pathname === '/store/orders' ? 'bg-emerald-400' :
                  pathname === '/store/cart' ? 'bg-orange-400' :
                  pathname === '/store/profile' ? 'bg-purple-400' : 'bg-gray-400'
                }
                animate-bounce
              `}
              style={{
                left: `${20 + i * 25}%`,
                top: `${10 + i * 20}%`,
                animationDuration: `${2 + i * 0.5}s`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}