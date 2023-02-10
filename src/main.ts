import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
// import router from './router/test'
import stydy_router from './router/study'

import 'element-plus/dist/index.css'
import '@/assets/base.scss'
import axios from 'axios'

import scrollBottom from './directives/scrollBottom'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.warn('未捕获的错误:')
  console.error(err)
  console.warn('来源:', info)
}
app.config.globalProperties.__http = axios
app.config.globalProperties.__window = window

app.directive('bottom', scrollBottom)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(stydy_router)
app.mount('#app')
