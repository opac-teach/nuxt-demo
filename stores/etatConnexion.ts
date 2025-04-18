// stores/etatConnexion.ts
import { defineStore } from 'pinia'

export const useConnexionStore = defineStore('connexion', () => {
  const token = useCookie('auth_token')

  function setToken(newToken: string) {
    token.value = newToken
  }

  function deleteCookie() {
    token.value = null
  }

  const etat = computed(() => !!token.value)

  return { 
    token,
    setToken,
    deleteCookie,
    etat
  }
})
