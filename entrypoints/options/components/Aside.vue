<script lang="ts" setup>
import { ref, unref, watchEffect } from 'vue'
import { ACTION } from '@/constants/meta'
import { actionBus } from '@/hooks/useEventBus'
import { useAppStore } from '@/stores/app'
import { useFilter } from '@/hooks/useFilter'
import { capitalize } from '@/utils'

const appStore = useAppStore()
const { filterList } = useFilter()

const filterValues = ref<Record<string, number[]>>(
  Object.fromEntries(filterList.value.map(filter => [filter.name, [filter.defaultValue]])),
)

function onUserAction(key: string) {
  actionBus.emit(key)
}
function onResetAllFilter() {
  filterValues.value = Object.fromEntries(
    filterList.value.map(filter => [filter.name, [filter.defaultValue]]),
  )
}

watchEffect(() => {
  appStore.setFilterValues(unref(filterValues))
})
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div class="h-[calc(100%-80px)]">
      <ScrollArea class="h-full">
        <div
          v-for="filter in filterList"
          :key="filter.name"
          class="grid gap-4 px-6 py-4"
        >
          <div class="flex items-center justify-between">
            <Label
              for="Blur"
              class="text-[16px]"
            >
              {{ capitalize(filter.name) }}
            </Label>
            <div class="flex items-center gap-2">
              <span
                class="min-w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
              >
                {{ `${filterValues[filter.name]?.[0]}${filter.unit}` }}
              </span>
              <Button
                @click="filterValues[filter.name] = [filter.defaultValue]"
                variant="ghost"
                size="xs"
              >
                Reset
              </Button>
            </div>
          </div>
          <Slider
            v-model="filterValues[filter.name]"
            :min="filter.min || 0"
            :max="filter.max"
            :step="1"
            :aria-label="capitalize(filter.name)"
            :id="filter.name"
            class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
      </ScrollArea>
    </div>
    <Separator />
    <div class="h-[80px] flex gap-2 px-4 justify-center items-center flex-wrap">
      <Button
        @click="onUserAction(ACTION.download)"
        variant="default"
      >
        Save Image
      </Button>
      <Button
        @click="onResetAllFilter"
        variant="default"
      >
        Reset All
      </Button>
    </div>
  </div>
</template>
