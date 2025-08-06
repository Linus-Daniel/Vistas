import type { Metadata } from "next";
import "../globals.css";
import StoreProviders from "@/components/store/StoreProviders";


export const metadata: Metadata = {
  title: "Nascomsoft - Your Online Store",
  description: "Find the best products at great prices", themeColor: "#ffffff",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" href="/images/logo.png" />
      <meta name="theme-color" content="#ffffff" />
      <body className={` bg-gray-50`}>
        <StoreProviders>{children}</StoreProviders>
      </body>
    </html>
  );
}
