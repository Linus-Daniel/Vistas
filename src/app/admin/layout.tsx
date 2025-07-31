import type { Metadata } from "next";
import "../globals.css";
import Layout from "@/components/admin/AdminLyout";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Nascomsoft Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
