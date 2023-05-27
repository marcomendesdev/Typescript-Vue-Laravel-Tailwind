import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '@/views/DefaultView.vue'
import GuestView from '@/views/GuestView.vue'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import Items from '@/components/Items.vue'
import UserItems from '@/components/UserItems.vue'
import AddItem from '@/components/AddItem.vue'
import PageNotFound from '@/components/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultView,
      meta: { authRequired: true },
      children: [
        {
          path: '/dashboard',
          redirect: '/items',
          component: Dashboard,
          children: [
            {
              path: '/items',
              name: 'Items',
              component: Items
            },
            {
              path: '/user-items',
              name: 'UserItems',
              component: UserItems
            },
            {
              path: '/add-item',
              name: 'AddItem',
              component: AddItem
            }
          ]
        }
      ]
    },
    {
      path: '/',
      redirect: '/login',
      component: GuestView,
      meta: { authRequired: false },
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/signup',
          name: 'Signup',
          component: SignUp
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.authRequired) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (token) {
      next('/dashboard')
    } else {
      next()
    }
  }
})

export default router
