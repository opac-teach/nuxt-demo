<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Liste des Memecoins</h1>
    <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>

    <ul v-if="!error && memecoins" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <li
        v-for="coin in memecoins"
        :key="coin.id"
        class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
      >
        <img :src="coin.logoUrl" :alt="`Logo de ${coin.name}`" class="w-16 h-16 object-contain mb-2" />
        <strong class="block text-lg font-semibold">{{ coin.name }} ({{ coin.symbol }})</strong>
        <p class="text-sm text-gray-600 dark:text-gray-300">Description: {{ coin.description }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Propriétaire: {{ coin.owner }}</p>
      </li>
    </ul>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface MemeCoin {
    id: string
    name: string
    symbol: string
    owner: string
    description: string
    logoUrl: string
  }
  
  const memecoins = ref<MemeCoin[] | null>(null)
  const error = ref<string | null>(null)
  
  const { data, error: fetchError } = await useFetch<MemeCoin[]>('/api/get-memecoins', {
    method: 'GET'
  })
  
  if (fetchError.value) {
    error.value = 'Erreur lors du chargement des données'
  } else {
    memecoins.value = data.value || []
  }
  </script>
  