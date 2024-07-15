import { ntnyq } from '@ntnyq/eslint-config'

export default ntnyq([
  {
    ignores: ['**/.wxt'],
  },
  {
    files: ['**/components/ui/**/*.ts', '**/components/ui/**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
