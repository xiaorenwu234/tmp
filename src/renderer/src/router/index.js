import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: HomeView
        },
        {
            path: '/home',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/reader',
            name: 'reader',
            component: () => import('../views/ReaderView.vue')
        },
        {
            path: '/print',
            name: 'print',
            component: () => import('../views/PrintView.vue')
        }
    ]
})

export default router
