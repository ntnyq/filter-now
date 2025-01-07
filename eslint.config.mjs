// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

const config = await defineESLintConfig({
  svgo: true,
})

export default config
