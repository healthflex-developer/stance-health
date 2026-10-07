import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SVGs are served as files from S3. Next blocks remote SVG unless this is set.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.stance.health",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "stance-health-production-upload.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "stance-development-upload.s3.us-east-1.amazonaws.com",
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
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
