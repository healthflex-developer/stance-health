/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   output: 'export',
  images: {
    unoptimized: true, // Add this line
  },
};

export default nextConfig;
