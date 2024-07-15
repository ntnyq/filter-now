import '@/assets/styles/app.css'
import './style.css'
import pinia from '@/stores'
import App from './App.vue'

const app = createApp(App)

app.use(pinia)

app.mount('#app')
