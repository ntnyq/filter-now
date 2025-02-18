<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue'
import { actionBus } from '@/composables/eventBus'
import { filterList } from '@/constants/filter'
import { ACTION } from '@/constants/meta'
import { useAppStore } from '@/stores/app'
import { downloadImageFromDom } from '@/utils/html2canvas'

const appStore = useAppStore()

const imageWrapperRef = useTemplateRef('imageWrapperRef')

const imageWrapperStyle = computed(() => {
  if (!appStore.filterValues) return ''
  const filterValues = filterList.map(filter => {
    if (appStore.filterValues![filter.name]?.[0] === filter.defaultValue) {
      return ''
    }
    return `${filter.name}(${appStore.filterValues![filter.name]?.[0]}${filter.unit})`
  })
  return `filter: ${filterValues.join(' ')};`
})

actionBus.on(action => {
  if (action === ACTION.download) {
    if (!imageWrapperRef.value) return
    downloadImageFromDom(imageWrapperRef.value)
  }
})

function onClearImage() {
  appStore.setImageDataUrl('')
  appStore.resetFilterValues()
}
</script>

<template>
  <div class="relative h-[calc(100vh-var(--h-navbar))] flex p-4">
    <div class="bg-grid relative flex flex-1 items-center justify-center">
      <div
        ref="imageWrapperRef"
        :style="imageWrapperStyle"
        class="h-5/6 w-5/6 flex items-center justify-center bg-white p-4"
      >
        <img
          :src="appStore.imageDataUrl"
          class="block max-h-full max-w-full object-contain"
        />
      </div>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            @click="onClearImage"
            class="absolute right-0 top-0"
            size="icon"
            variant="destructive"
          >
            <div class="i-radix-icons:delete" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear Current Image</TooltipContent>
      </Tooltip>
    </div>
  </div>
</template>
