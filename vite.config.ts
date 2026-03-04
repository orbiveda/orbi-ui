import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      babel: {
        parserOpts: {
          plugins: ["jsx"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@orbi/core": path.resolve(__dirname, "packages/core"),
      "@orbi/tokens": path.resolve(__dirname, "packages/tokens"),
      "@orbi/react": path.resolve(__dirname, "packages/react"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "**/*.test-d.ts"],
    threads: true,
    isolate: true,
  },
});