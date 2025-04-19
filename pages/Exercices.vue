<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Liste des Memecoins</h1>

    <p v-if="error" class="text-red-600 text-center font-medium">{{ error }}</p>

    <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
        v-for="coin in memecoins"
        :key="coin.id"
        class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center space-y-4"
      >
        <img
          :src="coin.logoUrl"
          :alt="`Logo de ${coin.name}`"
          class="w-20 h-20 object-contain rounded-full border border-gray-300"
        />
        <div>
          <h2 class="text-xl font-semibold text-gray-800">
            {{ coin.name }} ({{ coin.symbol }})
          </h2>
          <p class="text-sm text-gray-600 mt-2">Description : {{ coin.description }}</p>
          <p class="text-sm text-gray-500 mt-1">Propriétaire : {{ coin.owner }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  interface MemeCoin {
    id: string
    name: string
    symbol: string
    owner: string
    description: string
    logoUrl: string
  }
  
  const memecoins = ref<MemeCoin[]>([])
  const error = ref<string | null>(null)
  
  const fetchMemecoins = async (): Promise<void> => {
    try {
      const response = await fetch('/api/get-memecoins')
      if (!response.ok) throw new Error('Erreur lors du chargement des données')
      const data: MemeCoin[] = await response.json()
      memecoins.value = data
    } catch (err: any) {
      error.value = err.message || 'Une erreur est survenue'
    } finally {
    }
  }
  
  onMounted(fetchMemecoins)
  </script>


<!-- <script lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script> -->
  