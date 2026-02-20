import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "xtdhtmuaktzecmxouawu.supabase.co",
        pathname: "/storage/**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
