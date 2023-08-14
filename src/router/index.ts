import { createRouter, createWebHistory } from 'vue-router'
import RolesPage from '@/pages/RolesPage.vue'
import CreateRolePage from '@/pages/CreateRolePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'roles',
      component: RolesPage
    },
    {
      path: '/create-role',
      name: 'create-role',
      component: CreateRolePage
    }
  ]
})

export default router
