import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      "/.yalc/*",
      "/.pnp/*",
      "/build/*",
      "/coverage/*",
      "/dist/*",
      "/logs/*",
      "/docs/*",
      "/node_modules/*",
      "/.github/*",
    ],
  },
  // Includi direttamente la configurazione di prettier
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      sourceType: "module",
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error"],
    },
  },
];
