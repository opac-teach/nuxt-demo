// stores/etatConnexion.ts
import { defineStore } from 'pinia'

export const useEtatConnexionStore = defineStore('etatConnexion', () =>{
  const token = useCookie('auth_token')

  

  function deconnecter () {
    token.value = null
    
  }

  return { 
    deconnecter , 
    etat: computed(() => !!token.value )
  }
  
})