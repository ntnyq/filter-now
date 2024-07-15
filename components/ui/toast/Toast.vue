<script setup lang="ts">
import { computed } from 'vue'
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/utils/shadcn'
import { type ToastProps, toastVariants } from '.'

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
