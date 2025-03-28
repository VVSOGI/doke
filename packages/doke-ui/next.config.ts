import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  assetPrefix: "",
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
