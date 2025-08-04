import type { Metadata } from "next";
import "../globals.css";
import StoreProviders from "@/components/store/StoreProviders";


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
      <body className={` bg-gray-50`}>
        <StoreProviders>{children}</StoreProviders>
      </body>
    </html>
  );
}
