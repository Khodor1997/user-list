import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupStore } from './stores';

const app = createApp(App)

setupStore(app);

app.use(createPinia())

app.mount('#app')


