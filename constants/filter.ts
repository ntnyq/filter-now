/**
 * @file filters
 */

import type { FilterType } from '@/types'

type FilterItem = {
  name: FilterType
  defaultValue: number
  unit: 'px' | '%' | 'deg'
  min?: number
  max: number
}

export const filterList: FilterItem[] = [
  {
    name: 'blur',
    defaultValue: 0,
    unit: 'px',
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
    name: 'grayscale',
    defaultValue: 0,
    unit: '%',
    max: 100,
  },
  {
    name: 'hue-rotate',
    defaultValue: 0,
    unit: 'deg',
    max: 360,
  },
  {
    name: 'invert',
    defaultValue: 0,
    unit: '%',
    max: 100,
  },
  {
    name: 'opacity',
    defaultValue: 100,
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
    name: 'sepia',
    defaultValue: 0,
    unit: '%',
    max: 100,
  },
]

export const getDefaultFilterValues = () =>
  filterList.reduce(
    (acc, filter) => {
      acc[filter.name] = [filter.defaultValue]
      return acc
    },
    {} as Record<FilterType, number[]>,
  )
