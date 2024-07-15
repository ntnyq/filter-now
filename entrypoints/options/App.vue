<script lang="ts" setup>
import { ResizablePanel } from '@/components/ui/resizable'
import { useAppStore } from '@/stores/app'
import Main from './components/Main.vue'
import Aside from './components/Aside.vue'

const appStore = useAppStore()
</script>

<template>
  <main class="relative overflow-hidden flex flex-col h-screen min-w-[1200px]">
    <Navbar />
    <div class="relative h-[calc(100vh-var(--h-navbar))]">
      <div class="container h-full max-w-screen-2xl p-0 border border-border">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel :min-size="30">
            <Main />
          </ResizablePanel>
          <ResizableHandle with-handle />
          <ResizablePanel
            :min-size="25"
            :max-size="35"
            :default-size="appStore.imageDataUrl ? 25 : 0"
            :collapsed-size="0"
            :collapsible="!appStore.imageDataUrl"
            class="flex"
          >
            <Aside />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  </main>
  <Toaster />
</template>
