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
      const response = await $fetch("/api/get-memecoins-protected");
      coins.value = response
      error.value = ""
      loading.value = false
    } catch (error) {
      console.error(error);
      loading.value = false;
      error.value = "Error loading coins";
    }
  }

  async function getCoinById(id: string) {
    try {
      return await $fetch("/api/get-memecoin-by-id", {
        method: 'GET',
        params: { id }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function createCoin(form: Coin) {
    const userStore = useUser();

    const url = userStore.loggedIn 
      ? "/api/create-memecoin-protected" 
      : "/api/create-memecoin";

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      
      // Add Authorization header with JWT token if logged in
      if (userStore.loggedIn && userStore.token.value) {
        headers['Authorization'] = `Bearer ${userStore.token.value}`;
      }
      
      const response = await $fetch(url, {
        method: 'POST',
        headers,
        body: form
      });
      
      await getCoins();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getCoins,
    createCoin,
    getCoinById,
    coins,
    loading,
    error,
  }
})