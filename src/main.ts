import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router';

import DynamicPage from './pages/DynamicPage.vue';
import HomePage from './pages/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/:pageSlug(.*)',
        name: 'DynamicPage',
        component: DynamicPage,
        props: (route: RouteLocationNormalized) => ({ pageSlug: route.params.pageSlug })
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const pinia = createPinia()
const app = createApp(App);
app.use(pinia).use(router).mount('#app');
