<script setup>
import { useRoute } from 'vue-router'
import { useFetch } from '#app'

const route = useRoute()
const { id } = route.params

const { data: coin, pending, error } = await useFetch(`/api/memecoins/${id}`)
</script>

<template>
  <div class="container mx-auto p-6">
    <div v-if="pending" class="text-center">Chargement...</div>
    <div v-else-if="error" class="text-red-500 text-center">Erreur : {{ error.message }}</div>
    <div v-else class="text-center">
      <img :src="coin.logoUrl" alt="Logo" class="h-24 w-24 rounded-full mx-auto mb-4 border" />
      <h1 class="text-3xl font-bold">{{ coin.name }}</h1>
      <p class="text-xl text-gray-600">#{{ coin.symbol }}</p>
      <p v-if="coin.description" class="mt-4 text-gray-700">{{ coin.description }}</p>
      <NuxtLink to="/exercices" class="btn btn-secondary mt-6 inline-block">← Retour à la liste</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
