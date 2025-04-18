import { defineStore } from 'pinia'


export const useAuthentificationStore = defineStore('authentificationInfo', () => {
    const token = useCookie("auth_token")
    const isLoggedIn = computed(() => Boolean(token.value))

    const deconnexion = () => {
        token.value = null
        // Facultatif : appeler une route logout ici si tu en as une
    }

    return {
        token,
        isLoggedIn,
        deconnexion
    }
})
