<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ACTION } from '@/constants/meta'
import { actionBus } from '@/hooks/useEventBus'
import { useAppStore } from '@/stores/app'
import { downloadImageFromDom } from '@/utils/html2canvas'
import { filterList } from '@/constants/filter'
import RadixIconsDelete from '~icons/ri/delete-bin-5-line'

const appStore = useAppStore()

const imageWrapperRef = ref<HTMLElement>()

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
  <div class="relative h-[calc(100vh-var(--h-navbar))] p-4 flex">
    <div class="relative bg-grid flex-1 flex justify-center items-center">
      <div
        ref="imageWrapperRef"
        :style="imageWrapperStyle"
        class="w-5/6 h-5/6 p-4 flex justify-center items-center bg-white"
      >
        <img
          :src="appStore.imageDataUrl"
          class="object-contain block max-w-full max-h-full"
        />
      </div>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            @click="onClearImage"
            class="absolute top-0 right-0"
            size="icon"
            variant="destructive"
          >
            <RadixIconsDelete />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear Current Image</TooltipContent>
      </Tooltip>
    </div>
  </div>
</template>
