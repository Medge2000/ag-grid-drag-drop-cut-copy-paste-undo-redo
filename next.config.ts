import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // domains: ["mvpblobcdn.blob.core.windows.net"], // Add the external domain here
  },
};

export default nextConfig;
