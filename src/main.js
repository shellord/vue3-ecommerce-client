import { createApp, h } from 'vue'

import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'

import '@/styles/index.css'

const app = createApp({
  render: () => h(App),
})

app.use(router)
app.use(Toast)
app.mount('#app')
