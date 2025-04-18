<template>
    <div class="flex flex-col items-center justify-center p-4">
      <div v-if="loading" class="text-xl">Loading memecoin...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="coin" class="memecoin-details max-w-2xl w-full">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <img 
            :src="coin.logoUrl" 
            alt="Coin logo" 
            class="h-[200px] w-[200px] object-contain rounded-lg shadow-md" 
          />
          <div>
            <h1 class="text-3xl font-bold">{{ coin.name }} <span class="text-gray-500">({{ coin.symbol }})</span></h1>
            <p v-if="coin.description" class="mt-4 text-lg">{{ coin.description }}</p>
            <p class="mt-2 text-sm text-gray-500">Owner ID: {{ coin.owner }}</p>
          </div>
        </div>
        <div class="mt-8">
          <NuxtLink to="/exercices" class="btn">Back to list</NuxtLink>
        </div>
      </div>
      <div v-else class="text-xl text-red-500">Memecoin not found</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCoin } from '@/stores/coin';
  
  definePageMeta({
    middleware: ['auth']
  });
  
  const route = useRoute();
  const id = route.params.id as string;
  const coinStore = useCoin();
  
  const { data: coin, pending: loading, error } = await useAsyncData(
    `memecoin-${id}`,
    () => coinStore.getCoinById(id)
  );
  
  // SEO meta tags
  useSeoMeta({
    title: () => coin.value ? `${coin.value.name} (${coin.value.symbol})` : 'Memecoin',
    description: () => coin.value?.description || `Details about ${coin.value?.name} memecoin`,
    ogTitle: () => coin.value ? `${coin.value.name} (${coin.value.symbol})` : 'Memecoin',
    ogDescription: () => coin.value?.description || `Details about ${coin.value?.name} memecoin`,
    ogImage: () => coin.value?.logoUrl || '',
  });
  </script>