<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;



async function getCoinById(id: string){
    return useFetch(`/api/get-memecoins-by-id/${id}`, {
        method: "GET",
    });
}


const { data: coin, status: coinStatus, error: coinError } = await getCoinById(id)

watchEffect(() => {
  if (coin.value) {
    useSeoMeta({
      title: `Mon super Coin - ${coin.value.name}`,
      description: `C'est mon super coin : ${coin.value.name}`,
      ogTitle: `Mon super Coin - ${coin.value.name}`,
      ogDescription: coin.value.description || "Kilé bien mon coin quand même",
      ogImage: coin.value.logoUrl || undefined,
      twitterCard: "summary_large_image",
    });
  }
});


</script>

<template>
    
    <div class="p-8 bg-gray-200 flex-col justify-center h-full w-full rounded-lg">

      <h1 class="text-center text-4xl font-bold mb-6">Détail du Coin : {{ id }}</h1>
      <div class="flex bg-white flex-row justify-between shadow-md rounded-lg p-6">
        <div>
            <h2 class="text-2xl font-semibold mb-4">Nom : {{ coin.name }}</h2>
            <p class="mb-4">Description : {{ coin.description }}</p>
            <p class="mb-4">Symbole : {{ coin.symbol }}</p>
            <p class="mb-4">Créateur : {{ coin.owner }}</p>
        </div>
        <img :src="coin.logoUrl" alt="Logo du coin" class="my-auto h-32 w-32 rounded-full object-cover mr-4 border-2 border-black" />
       </div>
    </div>
  </template>