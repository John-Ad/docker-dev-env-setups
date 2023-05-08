import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

// router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: Home},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
    ]
})

createApp(App).use(vuetify).use(router).mount('#app')

