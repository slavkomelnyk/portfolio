import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import { prefix } from "@/config/main"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    agentFeedback: true,
  },
  output: 'export',
  basePath: prefix,
  assetPrefix: prefix,
  images: {
    unoptimized: true
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
