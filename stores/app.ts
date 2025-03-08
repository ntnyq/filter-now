/**
 * @file App store
 */

import { filterList, getDefaultFilterValues } from '@/constants/filter'
import { highlightCode } from '@/utils/shiki'
import type { FilterType } from '@/types'

export const useAppStore = defineStore('app', () => {
  const imageDataUrl = ref<string>('')

  const filterValues = ref<Record<FilterType, number[]>>(
    getDefaultFilterValues(),
  )

  const highlightedCode = ref('')
  const rawCSSCode = computed(() => {
    const filters = Object.entries(filterValues.value)
      .filter(([key, value]) => {
        return (
          value[0]
          !== filterList.find(filter => filter.name === key)?.defaultValue
        )
      })
      .map(([key, value]) => {
        return `${key}(${value[0]}${filterList.find(filter => filter.name === key)?.unit})`
      })
      .join(' ')
    if (!filters.length) return ''
    return `filter: ${filters};`
  })

  function setImageDataUrl(dataUrl: string) {
    imageDataUrl.value = dataUrl
  }

  function setFilterValues(values: Record<FilterType, number[]>) {
    filterValues.value = values
  }

  function resetFilterValues() {
    filterValues.value = getDefaultFilterValues()
  }

  watch(
    filterValues,
    async () => {
      highlightedCode.value = await highlightCode(rawCSSCode.value)
    },
    {
      deep: true,
    },
  )

  return {
    imageDataUrl,
    filterValues,
    rawCSSCode,
    highlightedCode,

    setFilterValues,
    setImageDataUrl,
    resetFilterValues,
  }
})
