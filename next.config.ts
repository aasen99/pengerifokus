import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/kombinasjoner",
        destination: "/fordeler",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
