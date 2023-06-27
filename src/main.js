// Vuetify
import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'

import router from './router'
//import axios from 'axios';

const vuetify = createVuetify({
    components,
    directives,
    })

const app = createApp(App)

app.use(router)
app.use(vuetify)
//app.use(axios)
//app.config.globalProperties.$http = axios
app.mount('#app')

