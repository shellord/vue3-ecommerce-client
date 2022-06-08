import { createApp, h, provide } from 'vue'

import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import '@/styles/index.css'

import router from './router'
import { apolloClient } from '@/lib/apollo'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.use(Toast)
app.mount('#app')
