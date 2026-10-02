import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'css/**',
      'scripts/texture-manifest.json',
      'js/planetData.json',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  prettier,
];
