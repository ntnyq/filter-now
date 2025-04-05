/**
 * Wxt config
 * @see {@link https://wxt.dev/api/config.html}
 */

import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'wxt'
import { resolve } from './scripts/utils'
// import type { Command } from '@/constants/command'

export default defineConfig({
  modules: ['@wxt-dev/module-vue', '@wxt-dev/unocss', '@wxt-dev/auto-icons'],

  outDir: 'dist',

  autoIcons: {
    baseIconPath: './assets/images/icon.png',
  },

  imports: {
    addons: {
      vueTemplate: true,
    },
    presets: [
      'vue',
      'pinia',
      'vue-router',
      {
        package: '@vueuse/core',
        ignore: [
          // exported from `vue`
          'toRef',
          'toRefs',
          'toValue',
          // exported from `wxt/storage`
          'useStorage',
        ],
      },
    ],
  },

  manifest: () => ({
    homepage_url: 'https://github.com/ntnyq/filter-now',
    name: 'Filter Now',
    commands: {
      openOptionsPage: {
        description: 'Open the Options page',
        suggested_key: {
          default: 'Alt+O',
        },
      },
    },
    content_security_policy: {
      extension_pages: `script-src 'self' 'wasm-unsafe-eval'; object-src 'self';`,
    },
    permissions: [
      'storage',
      // Open tabs in background
      'tabs',
    ],
  }),

  vite: () => ({
    build: {
      // Max per file size for Firefox is 4MB.
      chunkSizeWarningLimit: 4 * 1024,
    },

    css: {
      devSourcemap: true,
    },

    optimizeDeps: {
      // https://github.com/vitejs/vite/discussions/13306
      entries: ['**/entrypoints/**/*.html'],
    },

    plugins: [
      VueComponents({
        dirs: [resolve('components')],
        dts: resolve('types/components.d.ts'),
        resolvers: [],
      }),
    ],
  }),
})
