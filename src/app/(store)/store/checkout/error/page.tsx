"use client";

import Link from "next/link";

export default function CheckoutError() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          There was an issue processing your payment. Please try again or
          contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/checkout"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/store"
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
