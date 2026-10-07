import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Fahrzeugfotos aus dem Händlersystem des Autohauses
    remotePatterns: [{ protocol: "https", hostname: "www.webauto.de", pathname: "/imgcars/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
}

export default nextConfig
