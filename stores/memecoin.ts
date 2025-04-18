import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Memecoin {
  name: string
  symbol: string
  description: string
  logoUrl: string
}
export { type Memecoin }

export const useMemecoinStore = defineStore('memecoin', () => {
  const coins = ref<Memecoin[]>([])
  const isLoaded = ref(false)

  const fetchMemecoins = async () => {
    
    if (isLoaded.value) return // éviter double appel (client + SSR)
    
    try {
      const response = await fetch('/api/get-memecoins')

      if (!response.ok) {
        coins.value = [];
        throw new Error('Erreur lors de la récupération des données');
      }

      coins.value = await response.json()
      isLoaded.value = true
    } catch (err) {
      console.error('Erreur lors du fetch des MemeCoins:', err)
      coins.value = []
    }
  }

  const addCoin = (coin: Memecoin) => {
    coins.value.push(coin)
  }

  const setToNull = () => {
    coins.value = []
    isLoaded.value = false
  }

  return { memecoins: coins, fetchMemecoins, addCoin, setToNull }
})
