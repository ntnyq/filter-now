<script lang="ts" setup>
import { version } from '@/package.json'
import { META } from '@/constants/meta'
import { isDark, toggleDark } from '@/hooks/useDark'
import RadixIconsGithubLogo from '~icons/radix-icons/github-logo'
import RadixIconsMoon from '~icons/radix-icons/moon'
import RadixIconsSun from '~icons/radix-icons/sun'
</script>

<template>
  <div class="relative z-40 bg-background/80 backdrop-blur-lg border-b border-border">
    <div class="container flex items-center justify-between h-[var(--h-navbar)] max-w-screen-2xl">
      <div class="mr-4 md:mr-1 hidden md:flex gap-1">
        <img
          :alt="META.appTitle"
          class="w-6 h-6 block"
          src="/icon/48.png"
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
              <RadixIconsMoon v-if="isDark" />
              <RadixIconsSun v-else />
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
              <RadixIconsGithubLogo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>GitHub Repository</TooltipContent>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
