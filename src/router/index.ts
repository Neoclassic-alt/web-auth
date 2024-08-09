import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/check',
      name: 'check',
      component: () => import('../views/CheckAuth.vue')
    }
  ]
})

export default router
