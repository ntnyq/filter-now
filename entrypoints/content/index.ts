/**
 * @file Context content_script
 */
import '@/assets/styles/app.css'
import App from './App.vue'

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_end',
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'filter-now',
      position: 'inline',
      onMount(root) {
        const app = createApp(App)
        app.mount(root)
        return app
      },
      onRemove(app) {
        app?.unmount()
      },
    })

    ui.mount()

    // onCommand('triggerCommand', async () => {
    //   console.log('Extension toggled!', ctx)
    // })
  },
})
