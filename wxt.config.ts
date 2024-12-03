/**
 * Wxt config
 * @see {@link https://wxt.dev/api/config.html}
 */

import Vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'wxt'
import { resolve } from './scripts/utils'
import type { Manifest } from 'wxt/browser'
import type { Command } from '@/constants/command'

export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
    presets: [
      'vue',
      'pinia',
      'vue-router',
      {
        ignore: [
          // exported from `vue`
          'toRef',
          'toRefs',
          'toValue',
          // exported from `wxt/storage`
          'useStorage',
        ],
        package: '@vueuse/core',
      },
    ],
  },

  manifest: () => ({
    commands: {
      openOptionsPage: {
        description: 'Open the Options page',
        suggested_key: {
          default: 'Alt+O',
        },
      },
    } satisfies Record<Command, Manifest.WebExtensionManifestCommandsType>,
    content_security_policy: {
      extension_pages: `script-src 'self' 'wasm-unsafe-eval'; object-src 'self';`,
    },
    homepage_url: 'https://github.com/ntnyq/filter-now',
    name: 'Filter Now',
    permissions: [
      'storage',
      // Open tabs in background
      'tabs',
    ],
  }),

  outDir: 'dist',

  runner: {
    chromiumArgs: ['--auto-open-devtools-for-tabs'],
    startUrls: ['https://ntnyq.com'],
  },

  vite: () => ({
    css: {
      devSourcemap: true,
    },

    plugins: [
      Vue(),

      Icons({
        autoInstall: true,
        scale: 1.2,
      }),

      VueComponents({
        dirs: [resolve('components')],
        dts: 'types/components.d.ts',
        resolvers: [IconsResolver()],
      }),
    ],
  }),
})
