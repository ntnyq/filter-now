<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { ToastRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/utils/libs/shadcn'
import { toastVariants } from '.'
import type { ToastRootEmits } from 'reka-ui'
import type { ToastProps } from '.'

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

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
