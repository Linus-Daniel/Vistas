import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "storage.googleapis.com",
      "ui-avatars.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
