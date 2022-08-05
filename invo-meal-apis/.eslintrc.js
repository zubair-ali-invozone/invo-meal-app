module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-param-reassign": 0,
    "newline-per-chained-call": 0,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    "consistent-return": 0
  },
};
