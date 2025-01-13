import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import parser from '@typescript-eslint/parser'
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
        structuredClone: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': pluginImport
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'constructor-super': 'off',
      'object-curly-spacing': ['error', 'always'],
      'indent': ['error', 2],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins (e.g., fs, path)
            'external', // External libraries (e.g., react, lodash)
            'internal', // Internal imports (e.g., src/utils)
            ['parent', 'sibling'], // Parent and sibling imports
            'index', // Index file imports
            'object', // Object imports (e.g., import * as obj from ...)
          ],
          pathGroups: [
            {
              pattern: '@/components/**', // Custom aliases
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/features/**', // Custom aliases
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/store/**', // Custom aliases
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/pages/**', // Custom aliases
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // Enforce newlines between groups
          alphabetize: {
            order: 'asc', // Sort imports alphabetically
            caseInsensitive: true, // Ignore case when sorting
          },
        },
      ],
    },
  }
);
