module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Disable rules that might cause file descriptor issues
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
