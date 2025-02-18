/**
 * @file Shiki
 */

import { createHighlighterCore } from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'
import langCSS from '@shikijs/langs/css'
import vitesseDark from '@shikijs/themes/vitesse-dark'
import vitesseLight from '@shikijs/themes/vitesse-light'
import type { HighlighterCore } from '@shikijs/core'

const SHIKI_LANGS = [
  // css
  langCSS,
]

let highlighter: HighlighterCore | null = null

async function ensureHighlighter() {
  if (!highlighter) {
    highlighter ||= await createHighlighterCore({
      themes: [vitesseLight, vitesseDark],
      langs: SHIKI_LANGS,
      engine: createJavaScriptRegexEngine(),
    })
  }
  return highlighter
}

export async function highlightCode(code: string) {
  const highlighter = await ensureHighlighter()

  const dark = highlighter
    .codeToHtml(code, {
      lang: 'css',
      theme: 'vitesse-dark',
    })
    .replace(
      '<pre class="shiki vitesse-dark"',
      '<pre class="filter-now shiki shiki-dark"',
    )
  const light = highlighter
    .codeToHtml(code, {
      lang: 'css',
      theme: 'vitesse-light',
    })
    .replace(
      '<pre class="shiki vitesse-light"',
      '<pre class="filter-now shiki shiki-light"',
    )
  return `<pre class="shiki-container">${dark}${light}</pre>`
}
