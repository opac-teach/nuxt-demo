<script setup>
import { useFetch } from '#app' // si tu es bien dans Nuxt 3
import { useRouter } from 'vue-router'

const router = useRouter()

// Appel API pour récupérer les coins
const { data: coins, status, error } = await useFetch('/api/get-memecoins-protected', {
  method: 'GET',
})

console.log('Coins:', coins.value)

// Navigation vers les détails
function viewDetails(coin) {
  router.push(`/coin/${coin.id}`)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center text-primary mb-6">
      Liste des MemeCoins Disponibles
    </h1>

    <!-- Affichage si erreur -->
    <div v-if="error" class="flex flex-col items-center justify-center gap-6 mt-10">
  <h3 class="text-3xl font-bold text-red-500 text-center">
    Tu n'es pas connecté !
  </h3>

  <NuxtLink to="/Connect">
    <button
      type="button"
      class="bg-primary text-white rounded-xl w-[35vw] p-3 shadow-md hover:bg-primary/90 transition"
    >
      Viens te connecter
    </button>
  </NuxtLink>
</div>

    <!-- Affichage en cours de chargement -->
    <div v-else-if="status === 'pending'" class="text-center">
      Chargement en cours...
    </div>

    <!-- Grid de cartes -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="coin in coins"
        :key="coin.id"
        class="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div class="flex items-center justify-center mb-4">
          <img
            :src="coin.logoUrl"
            alt="logo"
            class="h-16 w-16 rounded-full border-2 border-gray-200 p-2"
          />
        </div>
        <h2 class="text-2xl font-semibold text-primary">{{ coin.name }}</h2>
        <p class="text-sm text-gray-500">#{{ coin.symbol }}</p>
        <div class="mt-4">
        <button @click="viewDetails(coin)" class="mt-2 w-full btn btn-primary focus:outline-none">
                Voir Détails
        </button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
