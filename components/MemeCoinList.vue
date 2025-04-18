<template>
    <div class="w-full m-full">
        <h1>MemeCoins :</h1>
        <br>
        <ul v-if="memeCoinStore.memecoins.length > 0" class="flex flex-wrap gap-4 justify-center">
            <li v-for="(memecoin, key) in memeCoinStore.memecoins" :key="key"
                class="bg-white rounded-2xl shadow-md p-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-start gap-2">
                <a :href="`/memecoins/${memecoin.id}`">
                    <MemeCoin :memecoin="memecoin" />
                </a>
            </li>
        </ul>
        <p v-else>No results</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemecoinStore } from '@/stores/memecoin.ts';

const memeCoinStore = useMemecoinStore();


onMounted(async () => {
    await memeCoinStore.fetchMemecoins();
    console.log("fetched memecoins : ", memeCoinStore.memecoins)
});
</script>