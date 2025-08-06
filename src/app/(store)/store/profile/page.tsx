"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User, Mail, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/auth");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-blue-600">
                {user.avatar ? (
                  <Image
                  width={500}
                  height={500}
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>

            <div className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg">
                <User className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <h3 className="font-medium">Personal Information</h3>
                  <p className="text-sm text-gray-500">
                    Update your name and email
                  </p>
                </div>
              </div>

              <Link
                href="/store/orders"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">My Orders</h3>
                  <p className="text-sm text-gray-500">
                    View your order history
                  </p>
                </div>
              </Link>

              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition text-red-600"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



