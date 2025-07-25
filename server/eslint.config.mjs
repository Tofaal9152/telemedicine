// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', 
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // 
      'prettier/prettier': 'off', // Disable Prettier rule
      'eslint-plugin-prettier/prettier': 'off', // Disable Prettier plugin rule
      '@typescript-eslint/no-unsafe-call': 'off', // Disable TypeScript rule
      '@typescript-eslint/no-unused-vars': 'off', // Disable TypeScript rule
      // '@typescript-eslint/no-unsafe-assignment': 'off', 
      // '@typescript-eslint/no-unsafe-member-access': 'off', 
    },
  },
);