import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    overrides: [
      {
        // Only uses Testing Library lint rules in test files
        files: [
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/*.test.ts",
          "**/*.test.tsx",
        ],
        env: {
          jest: true,
        },
        extends: ["plugin:testing-library/react"],
        rules: {
          "testing-library/no-render-in-setup": "off",
          "testing-library/prefer-presence-queries": "warn",
          "no-empty-function": "warn",
          "@typescript-eslint/no-empty-function": "warn",
          "@typescript-eslint/no-unused-vars": "warn",
          "import/named": "warn",
        },
      },

      // TODO: remove if not needed
      // {
      //   files: ["*.ts", "*.tsx"],
      //   rules: {
      //     "no-undef": "off",
      //   },
      // },
      // {
      //   files: [
      //     "**/*.stories.tsx",
      //     "**/*.stories.ts",
      //     "**/*.story.tsx",
      //     "**/*.story.ts",
      //   ],
      //   rules: {
      //     "import/named": "off",
      //   },
      // },
    ],

    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
