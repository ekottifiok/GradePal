const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "prettier",
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: {
    project,
  },
  plugins: [
    "react-hooks"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "import/no-named-as-default": "warn",  // warn about default cause Next.js need's this
    "@next/next/no-img-element": "off",         // don't warn about using the img tag
    "unicorn/filename-case": "warn",
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
}