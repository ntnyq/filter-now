/**
 * @file Shiki
 */

import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import cssLanguage from 'shiki/langs/css.mjs'
import vitesseDark from 'shiki/themes/vitesse-dark.mjs'
import vitesseLight from 'shiki/themes/vitesse-light.mjs'
import type { HighlighterCore } from 'shiki/core'

let highlighter: HighlighterCore | null = null

export async function highlightCode(code: string) {
  highlighter =
    highlighter ||
    (await createHighlighterCore({
      themes: [vitesseLight, vitesseDark],
      langs: [cssLanguage],
      engine: createJavaScriptRegexEngine(),
    }))

  const dark = highlighter
    .codeToHtml(code, {
      lang: 'css',
      theme: 'vitesse-dark',
    })
    .replace('<pre class="shiki vitesse-dark"', '<pre class="filter-now shiki shiki-dark"')
  const light = highlighter
    .codeToHtml(code, {
      lang: 'css',
      theme: 'vitesse-light',
    })
    .replace('<pre class="shiki vitesse-light"', '<pre class="filter-now shiki shiki-light"')
  return `<pre class="shiki-container">${dark}${light}</pre>`
}
