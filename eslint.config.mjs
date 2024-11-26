import { defineESLintConfig } from '@ntnyq/eslint-config'

const config = await defineESLintConfig(
  {},
  {
    files: ['**/components/ui/**/*.ts', '**/components/ui/**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)

export default config
