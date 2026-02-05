<script lang="ts" setup>
import { ResizablePanel } from '@/components/ui/resizable'
import { useAppStore } from '@/stores/app'
import Aside from './components/Aside.vue'
import Main from './components/Main.vue'

const appStore = useAppStore()
</script>

<template>
  <TooltipProvider>
    <main
      class="relative h-screen min-w-[1200px] flex flex-col overflow-hidden"
    >
      <Navbar />
      <div class="relative h-[calc(100vh-var(--h-navbar))]">
        <div class="container mx-auto h-full max-w-screen-2xl border p-0">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel :min-size="30">
              <Main />
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel
              :min-size="20"
              :max-size="25"
              :default-size="appStore.imageDataUrl ? 20 : 0"
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
  </TooltipProvider>
  <Toaster />
</template>
