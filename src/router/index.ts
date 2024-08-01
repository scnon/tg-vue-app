import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useWebAppBackButton } from 'vue-tg'

const backButton = useWebAppBackButton()

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/shop',
            name: 'shop',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ShopView.vue')
            // meta: { transition: 'slide-left' }
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('../views/OrderView.vue')
        },
        {
            path: '/address',
            name: 'address',
            component: () => import('../views/AddressView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        backButton.hideBackButton()
    } else {
        backButton.showBackButton()
    }

    next()
})

export default router
