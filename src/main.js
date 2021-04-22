import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@s/index'

import '@a/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(store).mount('#app')
