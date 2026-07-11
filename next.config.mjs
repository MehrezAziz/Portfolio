/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produces a self-contained .next/standalone server for a tiny Docker image.
  output: "standalone",
};

export default nextConfig;
