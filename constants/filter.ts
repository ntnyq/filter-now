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
    defaultValue: 0,
    max: 100,
    name: 'blur',
    unit: 'px',
  },
  {
    defaultValue: 100,
    max: 200,
    name: 'brightness',
    unit: '%',
  },
  {
    defaultValue: 100,
    max: 1000,
    name: 'contrast',
    unit: '%',
  },
  {
    defaultValue: 0,
    max: 100,
    name: 'grayscale',
    unit: '%',
  },
  {
    defaultValue: 0,
    max: 360,
    name: 'hue-rotate',
    unit: 'deg',
  },
  {
    defaultValue: 0,
    max: 100,
    name: 'invert',
    unit: '%',
  },
  {
    defaultValue: 100,
    max: 100,
    name: 'opacity',
    unit: '%',
  },
  {
    defaultValue: 100,
    max: 1000,
    name: 'saturate',
    unit: '%',
  },
  {
    defaultValue: 0,
    max: 100,
    name: 'sepia',
    unit: '%',
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
