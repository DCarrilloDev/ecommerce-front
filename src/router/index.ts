// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' 
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'landing', component: () => import('@/views/Landing.vue'), meta: { public: true } },
  { path: '/auth/sign-in', name: 'sign-in', component: () => import('@/views/auth/SignIn.vue'), meta: { public: true } },
  { path: '/auth/sign-up', name: 'sign-up', component: () => import('@/views/auth/SignUp.vue'), meta: { public: true } },

  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true, roles: ['ROLE_USER','ROLE_ADMIN'] } },

  { path: '/admin', name: 'admin', component: () => import('@/views/admin/AdminHome.vue'),
    meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] } },

  { path: '/forbidden', name: 'forbidden', component: () => import('@/views/Forbidden.vue'), meta: { public: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: { public: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (auth.isAuthenticated && (to.name === 'sign-in' || to.name === 'sign-up')) {
    return { name: 'dashboard' }
  }

  const needsAuth = to.matched.some(r => r.meta?.requiresAuth)
  if (!needsAuth) return true

  if (!auth.isAuthenticated) {
    return { name: 'sign-in', query: { redirect: to.fullPath } }
  }
  const allowed: string[] = to.matched
    .flatMap(r => (r.meta?.roles as string[] | undefined) ?? [])
  if (allowed.length && !allowed.includes(auth.role!)) {
    return { name: 'forbidden' }
  }
  return true
})

export default router
