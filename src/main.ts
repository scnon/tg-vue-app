import './assets/main.css'
import './assets/tailwind.css'
import 'tdesign-mobile-vue/es/style/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useWebAppBackButton } from 'vue-tg'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
