<script lang="ts" setup>
import { useDropZone, useFileDialog } from '@vueuse/core'
import { UploadCloud } from 'lucide-vue-next'
import { useTemplateRef } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const {
  open: openFileDialog,
  reset: resetSelectedFiles,
  onChange: handleFileDialogChange,
} = useFileDialog({
  multiple: false,
  accept: '.png,.jpg,.jpeg',
})

const dropZoneRef = useTemplateRef('dropZoneRef')
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop(files, event) {
    event.preventDefault()
    if (!files?.length) {
      return
    }
    tryLoadFile(files[0])
  },
  dataTypes: ['image/png', 'image/jpeg', 'image/jpg'],
})

handleFileDialogChange(files => {
  if (!files?.length) {
    return
  }
  tryLoadFile(files[0])
})

function tryLoadFile(file: File) {
  const reader = new FileReader()

  reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
    const content = event.target?.result ?? ''
    if (typeof content !== 'string') {
      return
    }
    appStore.setImageDataUrl(content)
    resetSelectedFiles()
  })

  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="relative h-[calc(100vh-var(--h-navbar))] flex p-4">
    <div class="relative flex flex-auto items-center justify-center">
      <div
        @click="openFileDialog()"
        ref="dropZoneRef"
        :class="{
          'bg-green-100 dark:bg-green-600': isOverDropZone,
          'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-700':
            !isOverDropZone,
        }"
        class="h-[180px] w-[400px] cursor-pointer rounded-md transition-colors duration-200 ease-in-out"
        role="button"
      >
        <div
          class="h-full flex flex-col items-center justify-center gap-2 text-zinc-600 dark:text-zinc-200"
        >
          <UploadCloud class="h-12 w-12" />
          <p class="text-lg">Select or drop an image file here</p>
        </div>
      </div>
    </div>
  </div>
</template>
