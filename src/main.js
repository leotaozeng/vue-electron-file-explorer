import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@s/index'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(store).mount('#app')
