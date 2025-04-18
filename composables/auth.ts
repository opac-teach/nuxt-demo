import { useCookie } from '#app'

export const useAuth = () => {
  const token = useCookie('auth_token', {
    watch: true
  })

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  const logout = () => {
    token.value = null
  }

  return {
    isAuthenticated,
    logout
  }
}