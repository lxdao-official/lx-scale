import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
