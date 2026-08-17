import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/fxhi8rmk/**",
      },
      {
        protocol: "https",
        hostname: "www.stance.health",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Cloudinary handles format negotiation — request webp/avif via URL params
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
