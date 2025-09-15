import { defineStore } from 'pinia'
import { http } from '@/api/http'

type Role = 'ROLE_USER' | 'ROLE_ADMIN'
interface User { email: string; role: Role }
interface AuthState { token: string|null; user: User|null }

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ token: null, user: null }),
  getters: {
    isAuthenticated: s => !!s.token,
    role: s => s.user?.role
  },
  actions: {
    loadFromStorage() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token) this.token = token
      if (user)  this.user  = JSON.parse(user)
    },
    async register(payload: { email:string; password:string; name?:string, lastName?:string }) {
      await http.post('/auth/register', payload)
    },
    async login(payload: { email:string; password:string }) {
      const { data } = await http.post('/auth/login', payload)
      this.token = data.token
      this.user  = { email: payload.email, role: data.role as Role }
      localStorage.setItem('token', this.token!)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
