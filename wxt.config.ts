/**
 * Wxt config
 * @see {@link https://wxt.dev/api/config.html}
 */

import { defineConfig } from 'wxt'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import VueComponents from 'unplugin-vue-components/vite'
import { resolve } from './scripts/utils'
import type { Command } from '@/constants/command'
import type { Manifest } from 'wxt/browser'

const CSP = `script-src 'self' 'wasm-unsafe-eval'; object-src 'self';`

export default defineConfig({
  outDir: 'dist',

  manifest: ({ browser }) => ({
    name: 'Filter Now',
    permissions: [
      'storage',
      // Open tabs in background
      'tabs',
    ],
    homepage_url: 'https://github.com/ntnyq/filter-now',
    ...(browser === 'chrome'
      ? {
          content_security_policy: {
            extension_pages: CSP,
          },
        }
      : {
          content_security_policy: CSP,
        }),
    commands: {
      openOptionsPage: {
        suggested_key: {
          default: 'Alt+O',
        },
        description: 'Open the Options page',
      },
    } satisfies Record<Command, Manifest.WebExtensionManifestCommandsType>,
  }),

  runner: {
    chromiumArgs: ['--auto-open-devtools-for-tabs'],
    startUrls: ['https://ntnyq.com'],
  },

  imports: {
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
    addons: {
      vueTemplate: true,
    },
  },

  vite: () => ({
    css: {
      devSourcemap: true,
    },

    plugins: [
      Vue(),

      Icons({
        scale: 1.2,
      }),

      VueComponents({
        dts: 'types/components.d.ts',
        dirs: [resolve('components')],
        resolvers: [IconsResolver()],
      }),
    ],
  }),
})
