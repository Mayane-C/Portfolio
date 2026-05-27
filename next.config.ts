import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
