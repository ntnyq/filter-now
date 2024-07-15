/**
 * @file useFilter
 */

import type { FilterType } from '@/types'

interface UseFilterOptions {}

type FilterItem = {
  name: FilterType
  defaultValue: number
  unit: 'px' | '%'
  min?: number
  max: number
}

export function useFilter(_options: UseFilterOptions = {}) {
  const filterList = ref<FilterItem[]>([
    {
      name: 'blur',
      defaultValue: 0,
      unit: 'px',
      max: 100,
    },
    {
      name: 'grayscale',
      defaultValue: 0,
      unit: '%',
      max: 100,
    },
    {
      name: 'brightness',
      defaultValue: 100,
      unit: '%',
      max: 200,
    },
    {
      name: 'contrast',
      defaultValue: 100,
      unit: '%',
      max: 1000,
    },
    {
      name: 'sepia',
      defaultValue: 0,
      unit: '%',
      max: 100,
    },
    {
      name: 'saturate',
      defaultValue: 100,
      unit: '%',
      max: 1000,
    },
    {
      name: 'opacity',
      defaultValue: 100,
      unit: '%',
      max: 100,
    },
    {
      name: 'invert',
      defaultValue: 0,
      unit: '%',
      max: 100,
    },
  ])

  return {
    filterList,
  }
}
