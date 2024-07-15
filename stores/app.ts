/**
 * @file App store
 */

import type { FilterType } from '@/types'

export const useAppStore = defineStore('app', () => {
  const imageDataUrl = ref<string>('')

  const filterValues = ref<Record<FilterType, number[]> | undefined>()

  function setImageDataUrl(dataUrl: string) {
    imageDataUrl.value = dataUrl
  }

  function setFilterValues(values: Record<FilterType, number[]>) {
    filterValues.value = values
  }

  return {
    imageDataUrl,
    filterValues,

    setFilterValues,
    setImageDataUrl,
  }
})
