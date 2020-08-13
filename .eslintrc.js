module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    node: true
  },
  ignorePatterns: ["dist"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": ["error", {"ts-expect-error": false}],
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};
