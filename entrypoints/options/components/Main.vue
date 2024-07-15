<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import FileView from './FileView.vue'
import PreviewView from './PreviewView.vue'

const appStore = useAppStore()
</script>

<template>
  <PreviewView v-if="appStore.imageDataUrl" />
  <FileView v-else />
</template>
