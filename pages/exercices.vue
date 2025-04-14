<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const coins = ref([]);

onMounted(() => {
  getCoins();
})

async function getCoins() {
    try {
        const res = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
        const data = await res.json();
        coins.value = data;
    } catch (error) {
        console.error("Erreur de récupération des coins", error);
    }
}
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl font-bold text-center text-primary mb-6">Liste des MemeCoins Disponibles</h1>
        
        <!-- Grid de cartes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="coin in coins" :key="coin.id" class="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                <div class="flex items-center justify-center mb-4">
                    <img :src="coin.logoUrl" alt="logo" class="h-16 w-16 rounded-full border-2 border-gray-200 p-2">
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
/* Quelques styles personnalisés si nécessaires */
.container {
    max-width: 1200px;
}
</style>
