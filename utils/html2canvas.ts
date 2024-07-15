/**
 * @file html2canvas
 */

import type { Options } from 'html2canvas'

export async function downloadImageFromDom(element: HTMLElement, options: Partial<Options> = {}) {
  const { default: html2canvas } = await import('html2canvas')
  const oldCanavs = await html2canvas(element, options)

  const newCanvas = document.createElement('canvas')

  newCanvas.width = oldCanavs.width
  newCanvas.height = oldCanavs.height

  // Workaround for https://github.com/niklasvh/html2canvas/issues/493
  const context = newCanvas.getContext('2d')
  context!.filter = getComputedStyle(element).filter
  context?.drawImage(oldCanavs, 0, 0, oldCanavs.width, oldCanavs.height)

  const url = newCanvas.toDataURL('image/png', 0.97)

  const a = document.createElement('a')
  a.href = url
  a.download = 'image.png'
  a.click()
}
