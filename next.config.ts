import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Os assets são servidos estaticamente de /public/assets.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
