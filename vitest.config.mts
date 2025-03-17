import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    fileParallelism: false,
    setupFiles: [],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}", "**/__tests__/*.{js,mjs,cjs,ts,mts,cts}"],
    deps: {},
  },
});
