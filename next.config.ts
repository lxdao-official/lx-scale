import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  // 添加自定义静态资源路径配置
  async rewrites() {
    return [
      {
        source: '/share/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
