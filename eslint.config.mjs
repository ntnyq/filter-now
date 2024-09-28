import { defineESLintConfig } from '@ntnyq/eslint-config'

const config = defineESLintConfig().append({
  files: ['**/components/ui/**/*.ts', '**/components/ui/**/*.vue'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
})

export default config
