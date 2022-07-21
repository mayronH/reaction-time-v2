import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/global.css'

import firebaseApp from './firebase/firebaseInit'
console.log(firebaseApp)

createApp(App).use(createPinia()).use(router).mount('#app')
