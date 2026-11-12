import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

import { prefix } from "@/config/main"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    agentFeedback: true,
  },
  env: { NEXT_PUBLIC_BASE_PATH: prefix },
  output: 'export',
  // Emit pl/index.html instead of pl.html so /pl/ resolves on GitHub Pages.
  trailingSlash: true,
  basePath: prefix,
  assetPrefix: prefix,
  images: {
    unoptimized: true
  },
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
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));
