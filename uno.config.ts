/**
 * @file UnoCSS config
 */

import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },

  presets: [
    presetWind3(),
    presetAnimations(),
    presetShadcn(
      {
        color: 'orange',
        darkSelector: '.dark',
      },
      {
        componentLibrary: 'reka',
      },
    ),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
      extraProperties: {
        color: 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
  ],

  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'wh-full': 'w-full h-full',
    },
  ],

  theme: {
    colors: {},
  },
})
