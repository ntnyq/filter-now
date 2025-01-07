<script lang="ts" setup>
import { pascalCase } from '@ntnyq/utils'
import { useClipboard } from '@vueuse/core'
import RiCss3Fill from '~icons/ri/css3-fill'
import RiResetLeftLine from '~icons/ri/reset-left-line'
import RiSave3Fill from '~icons/ri/save-3-fill'
import { useToast } from '@/components/ui/toast'
import { actionBus } from '@/composables/useEventBus'
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
  <div class="flex-1 flex flex-col">
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
                class="min-w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
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
    <div class="h-[80px] flex gap-4 px-4 justify-center items-center flex-wrap">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            @click="onUserAction(ACTION.download)"
            variant="default"
            size="icon"
          >
            <RiSave3Fill />
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
                <RiCss3Fill />
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
          <div class="relative py-4 w-full overflow-x-auto">
            <div
              v-if="appStore.rawCSSCode"
              v-html="appStore.highlightedCode"
              class="font-mono text-lg py-4 w-full overflow-x-auto"
            />
            <div
              v-else
              class="p-10 justify-center text-lg text-zinc-500 bg-zinc-100 flex items-center dark:bg-zinc-800 dark:text-zinc-500"
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
            <RiResetLeftLine />
          </Button>
        </TooltipTrigger>
        <TooltipContent> Reset All Filters </TooltipContent>
      </Tooltip>
    </div>
  </div>
</template>
