/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"]
    }
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    ecmaVersion: "latest"
  },
  ignorePatterns: ["/*.ts", "/*.js", "/*.cjs"],
  rules: {
    "vue/multi-word-component-names": ["error", {}],
    "import/no-unresolved": "off"
  }
};
