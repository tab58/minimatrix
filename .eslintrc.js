module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // rules severity: 0 = off, 1 = warn, 2 = error
  rules: {
    "@typescript-eslint/no-explicit-any": 0
  }
}