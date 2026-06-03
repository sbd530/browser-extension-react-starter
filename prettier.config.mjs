/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './assets/tailwind.css',
  tailwindFunctions: ['cn', 'cva'],
};
