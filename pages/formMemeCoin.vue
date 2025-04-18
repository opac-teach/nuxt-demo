<template>
  <div class="max-w-xl mx-auto p-6">
    <div v-if="!isAuthenticated" class="text-center space-y-4">
      <p class="text-lg text-gray-700 dark:text-gray-300">Vous devez être connecté pour créer un Memecoin.</p>
      <button
        @click="router.push('/authentification')"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Se connecter
      </button>
    </div>

    <form v-else @submit.prevent="createMemecoin" class="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <div>
        <label for="name" class="block font-medium text-gray-800 dark:text-gray-200 mb-1">Nom du Memecoin</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          required
          class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label for="symbol" class="block font-medium text-gray-800 dark:text-gray-200 mb-1">Symbole</label>
        <input
          v-model="formData.symbol"
          type="text"
          id="symbol"
          required
          class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label for="description" class="block font-medium text-gray-800 dark:text-gray-200 mb-1">Description</label>
        <textarea
          v-model="formData.description"
          id="description"
          class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        ></textarea>
      </div>
      <div>
        <label for="logoUrl" class="block font-medium text-gray-800 dark:text-gray-200 mb-1">URL du logo</label>
        <input
          v-model="formData.logoUrl"
          type="text"
          id="logoUrl"
          class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Créer
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth'

const router = useRouter()
const { isAuthenticated } = useAuth()

const formData = ref({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const createMemecoin = async () => {
  const { name, symbol, description, logoUrl } = formData.value

  if (!name || name.length < 4 || name.length > 16) {
    alert("Le nom doit comporter entre 4 et 16 caractères")
    return
  }

  if (!symbol || symbol.length < 2 || symbol.length > 4 || symbol.toUpperCase() !== symbol) {
    alert("Le symbole doit comporter entre 2 et 4 caractères et être en majuscules")
    return
  }

  try {
    const result = await $fetch('/api/create-memecoin-protected', {
      method: 'POST',
      credentials: 'include',
      body: { name, symbol, description, logoUrl }
    })

    alert(result.message || 'Création réussie')

    formData.value = {
      name: '',
      symbol: '',
      description: '',
      logoUrl: ''
    }
  } catch (err: any) {
    if (err?.statusCode === 401) {
      alert("Veuillez vous connecter d'abord")
    } else {
      alert('Une erreur est survenue')
    }
  }
}
</script>
