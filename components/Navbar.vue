<script lang="ts" setup>
import { browser } from 'wxt/browser'
import { isDark, toggleDark } from '@/composables/dark'
import { META } from '@/constants/meta'
import { version } from '@/package.json'

const iconUrl = browser.runtime.getURL('/icons/48.png')
</script>

<template>
  <div class="relative z-40 border border-b bg-background/80 backdrop-blur-lg">
    <div
      class="mx-auto h-[var(--h-navbar)] max-w-screen-2xl flex items-center justify-between container"
    >
      <div class="mr-4 hidden gap-1 md:mr-1 md:flex">
        <img
          :alt="META.appTitle"
          :src="iconUrl"
          class="block h-6 w-6"
        />
        <h1 class="text-lg font-bold">{{ META.appTitle }}</h1>
        <small>v{{ version }}</small>
      </div>
      <div class="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              @click="toggleDark"
              variant="ghost"
              size="icon"
            >
              <div
                :class="isDark ? 'i-radix-icons:moon' : 'i-radix-icons:sun'"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle Color Mode</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              as="a"
              href="https://github.com/ntnyq/filter-now"
              target="_blank"
              variant="ghost"
              size="icon"
            >
              <div class="i-radix-icons:github-logo" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>GitHub Repository</TooltipContent>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
