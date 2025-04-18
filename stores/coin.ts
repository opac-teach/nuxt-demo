import { ref } from 'vue';
import { defineStore } from 'pinia'
import { useUser } from '@/stores/user'

export interface Coin {
  name: string,
  symbol: string,
  description: string,
  logoUrl: string,
}

export const useCoin = defineStore("coin", () => {
  const coins = ref<Coin[]>([]);
  const loading = ref(true);
  const error = ref("")

  async function getCoins() {
    loading.value = true;
    try {
      const response = await $fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins-protected");
      coins.value = response
      console.log(response)
      error.value = ""
      loading.value = false
    } catch (error) {
      console.error(error);
      loading.value = false;
      error.value = "Error loading coins";
    }
  }

  async function createCoin(form: Coin) {
    const userStore = useUser();

    const url = userStore.loggedIn ? "https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected" : "https://nuxt-demo-blush.vercel.app/api/create-memecoin";
    // form.jwt = userStore.jwt

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!response.ok){
        return;
      }
      await getCoins();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getCoins,
    createCoin,
    coins,
    loading,
    error,
  }
})

