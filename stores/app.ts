/**
 * @file App store
 */

import { getDefaultFilterValues } from '@/constants/filter'
import type { FilterType } from '@/types'

export const useAppStore = defineStore('app', () => {
  const imageDataUrl = ref<string>('')

  const filterValues = ref<Record<FilterType, number[]>>(getDefaultFilterValues())

  function setImageDataUrl(dataUrl: string) {
    imageDataUrl.value = dataUrl
  }

  function setFilterValues(values: Record<FilterType, number[]>) {
    filterValues.value = values
  }

  function resetFilterValues() {
    filterValues.value = getDefaultFilterValues()
  }

  return {
    imageDataUrl,
    filterValues,

    setFilterValues,
    setImageDataUrl,
    resetFilterValues,
  }
})
