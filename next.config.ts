import type { NextConfig } from "next";

const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION || "1";

const nextConfig: NextConfig = {
  images: {
    // Local files from public/ use ?_v= for cache busting. Next.js 16 rejects
    // that query unless it is listed here. The empty search keeps images
    // without a query string allowed.
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/stance-health/**", search: `?_v=${assetVersion}` },
    ],
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
        hostname: "stance-development-upload.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
