import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type Role = 'admin' | 'partner'

export type AuthUser = {
  id: string
  email: string
  role: Role
}

const STORAGE_KEY = 'brhc_auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)

  const isAuthed = computed(() => Boolean(token.value && user.value))
  const role = computed(() => user.value?.role ?? null)

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as { token: string; user: AuthUser }
      token.value = parsed.token
      user.value = parsed.user
    } catch {
      // ignore
    }
  }

  function saveToStorage() {
    if (!token.value || !user.value) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: token.value, user: user.value }))
  }

  function clear() {
    token.value = null
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  function setSession(next: { token: string; user: AuthUser }) {
    token.value = next.token
    user.value = next.user
    saveToStorage()
  }

  return { token, user, role, isAuthed, loadFromStorage, setSession, clear }
})
