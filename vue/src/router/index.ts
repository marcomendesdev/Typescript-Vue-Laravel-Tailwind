import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '@/views/DefaultView.vue'
import GuestView from '@/views/GuestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultView',
      component: DefaultView
    },
    {
      path: '/',
      name: 'GuestView',
      component: GuestView
    },
  ]
})

export default router
