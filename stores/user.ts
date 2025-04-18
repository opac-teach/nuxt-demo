import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
  const token = useCookie('auth_token');
  const loggedIn =  computed(() => !!token.value);

  async function login(form: Coin) {
      const response = await $fetch("/api/login-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
  }

  function logout() {
    token.value = null
  }

  return {
    login,
    logout,
    token,
    loggedIn,
  }
})
