<template>
    <div class="p-6">
      <div v-if="error" class="text-red-600 font-bold text-center">{{ error }}</div>
      <div v-else-if="memecoin" class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">{{ memecoin.name }} ({{ memecoin.symbol }})</h1>
        <img :src="memecoin.logoUrl" :alt="`Logo de ${memecoin.name}`" class="w-24 h-24 rounded-full mb-4" />
        <p class="text-gray-600 mb-2"><strong>Description :</strong> {{ memecoin.description }}</p>
        <p class="text-gray-500"><strong>Propriétaire :</strong> {{ memecoin.owner }}</p>
      </div>
    </div>
  </template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { MemeCoin } from '~/types'

const route = useRoute()
const memecoin = ref<MemeCoin | null>(null)
const error = ref('')

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await fetch(`/api/get-memecoin/${id}`)
    if (!res.ok) throw new Error('Memecoin introuvable')
    memecoin.value = await res.json()
  } catch (err: any) {
    error.value = err.message
  }
})
</script>