/**
 * @file Context background
 */

import { COMMANDS } from '@/constants/command'
import { browser, defineBackground } from '#imports'

export default defineBackground({
  main() {
    browser.commands.onCommand.addListener(async command => {
      if (command !== COMMANDS.openOptionsPage) return
      browser.runtime.openOptionsPage()
    })
  },
})
