module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["plugin:vue/vue3-recommended", "prettier", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["vue", "html", "prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error"
  }
};