<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { pascalCase } from 'uncase'
import { useToast } from '@/components/ui/toast'
import { actionBus } from '@/composables/eventBus'
import { filterList } from '@/constants/filter'
import { ACTION } from '@/constants/meta'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { toast } = useToast()
const { copy } = useClipboard()

function onUserAction(key: string) {
  actionBus.emit(key)
}
function onResetFilter(filter: (typeof filterList)[number]) {
  appStore.filterValues[filter.name] = [filter.defaultValue]
}
async function onCopyCode() {
  await copy(appStore.rawCSSCode)
  toast({
    title: 'CSS code copied to clipboard.',
  })
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="h-[calc(100%-80px)]">
      <ScrollArea class="h-full">
        <div
          v-for="filter in filterList"
          :key="filter.name"
          class="grid gap-4 px-4 py-4"
        >
          <div class="flex items-center justify-between">
            <Label
              for="Blur"
              class="text-[16px]"
            >
              {{ pascalCase(filter.name) }}
            </Label>
            <div class="flex items-center gap-2">
              <span
                class="min-w-12 border border-transparent rounded-md px-2 py-0.5 text-right text-sm text-muted-foreground hover:border"
              >
                {{ `${appStore.filterValues[filter.name]?.[0]}${filter.unit}` }}
              </span>
              <Button
                @click="onResetFilter(filter)"
                variant="ghost"
                size="xs"
              >
                Reset
              </Button>
            </div>
          </div>
          <Slider
            v-model="appStore.filterValues[filter.name]"
            :min="filter.min || 0"
            :max="filter.max"
            :step="1"
            :aria-label="pascalCase(filter.name)"
            :id="filter.name"
            class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
      </ScrollArea>
    </div>
    <Separator />
    <div class="h-[80px] flex flex-wrap items-center justify-center gap-4 px-4">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            @click="onUserAction(ACTION.download)"
            variant="default"
            size="icon"
          >
            <div class="i-ri:save-3-fill" />
          </Button>
        </TooltipTrigger>
        <TooltipContent> Save Image </TooltipContent>
      </Tooltip>
      <Dialog>
        <Tooltip>
          <TooltipTrigger as-child>
            <DialogTrigger as-child>
              <Button
                variant="default"
                size="icon"
              >
                <div class="i-ri:css3-fill" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent> View CSS Code </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CSS Code</DialogTitle>
            <DialogDescription>This is generated CSS code.</DialogDescription>
          </DialogHeader>
          <div class="relative w-full overflow-x-auto py-4">
            <div
              v-if="appStore.rawCSSCode"
              v-html="appStore.highlightedCode"
              class="w-full overflow-x-auto py-4 text-lg font-mono"
            />
            <div
              v-else
              class="flex items-center justify-center bg-zinc-100 p-10 text-lg text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
            >
              No CSS code generated.
            </div>
          </div>
          <DialogFooter class="!justify-center !gap-4">
            <Button
              @click="onCopyCode"
              v-if="appStore.rawCSSCode"
              type="button"
              variant="default"
            >
              Copy Code
            </Button>
            <DialogClose as-child>
              <Button
                type="button"
                variant="secondary"
              >
                Close Dialog
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            @click="appStore.resetFilterValues"
            variant="default"
            size="icon"
          >
            <div class="i-ri:reset-left-line" />
          </Button>
        </TooltipTrigger>
        <TooltipContent> Reset All Filters </TooltipContent>
      </Tooltip>
    </div>
  </div>
</template>
