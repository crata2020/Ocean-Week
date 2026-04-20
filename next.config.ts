import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "pjxuvjcwlhcevwrecvof.supabase.co",
      },
    ],
  },
};

export default nextConfig;
