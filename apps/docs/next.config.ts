import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@orbi/react", "@orbi/tokens", "@orbi/core"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@orbi/react$": path.resolve(__dirname, "../../packages/react/index.ts"),
      "@orbi/react": path.resolve(__dirname, "../../packages/react"),
    };
    return config;
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
