import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import astroPlugin from 'eslint-plugin-astro'

export default [
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
        tsconfigRootDir: './',
        project: './tsconfig.json',
      },
    },
    plugins: {
      astro: astroPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended,
      ...typescriptPlugin.configs.recommended,
      // Add any Astro-specific ESLint rules here
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: './',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended,
      // Add any JavaScript/TypeScript-specific ESLint rules here
    },
  },
]
