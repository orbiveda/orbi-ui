import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@orbi/core": path.resolve(__dirname, "packages/core"),
      "@orbi/tokens": path.resolve(__dirname, "packages/tokens"),
      "@orbi/react": path.resolve(__dirname, "packages/react"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "**/*.test-d.ts"],
  },
});