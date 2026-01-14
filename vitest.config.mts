import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    fileParallelism: false,
    setupFiles: [],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}", "**/__tests__/*.{js,mjs,cjs,ts,mts,cts}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    deps: {},
    coverage: {
      // Include covered and uncovered files matching this pattern:
      include: ["packages/**/src/**.{js,jsx,ts,tsx}"],

      // Exclusion is applied for the files that match include pattern above
      // No need to define root level *.config.ts files or node_modules, as we didn't add those in include
      exclude: ["**/some-pattern/**"],
    },
  },
});
