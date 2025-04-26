import { defineStore } from 'pinia'

export interface Memecoin {
  name: string
  symbol: string
  description?: string
  logoUrl?: string
}

interface State {
  list: Memecoin[]
  loading: boolean
  error: string
}

export const useMemecoinStore = defineStore('memecoins', {
  state: (): State => ({
    list: [],
    loading: false,
    error: ''
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = ''
      try {
        const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
        const data: Memecoin[] = await res.json()
        this.list = data
      } catch (err) {
        this.error = 'Erreur lors du chargement des memecoins'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})


