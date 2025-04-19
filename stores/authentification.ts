import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const userId = ref<number | null>(null)
  const isAuthenticated = ref(false)

  function setAuth(tokenValue: string, id: number) {
    token.value = tokenValue
    userId.value = id
    isAuthenticated.value = true
    localStorage.setItem('auth_token', tokenValue)
    localStorage.setItem('auth_user_id', id.toString())
    console.log('Saved token')
  }

  function loadAuthFromStorage() {
    const savedToken = localStorage.getItem('auth_token')
    const savedUserId = localStorage.getItem('auth_user_id')
    if (savedToken && savedUserId) {
      token.value = savedToken
      userId.value = parseInt(savedUserId)
      isAuthenticated.value = true
    }
  }

  function logout() {
    token.value = ''
    userId.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user_id')
  }

  loadAuthFromStorage()

  return { token, userId, isAuthenticated, setAuth, loadAuthFromStorage, logout }
})
