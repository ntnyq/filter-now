<script setup lang="ts">
import { ToastRoot, useForwardPropsEmits, type ToastRootEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/utils/libs/shadcn'
import { toastVariants, type ToastProps } from '.'

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    @update:open="onOpenChange"
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
  >
    <slot />
  </ToastRoot>
</template>
