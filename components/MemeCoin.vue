<template>
    <div class="w-full m-full">
        <h1>MemeCoin :</h1>
        <br>
        <h2 class="text-xl font-semibold text-indigo-600">{{ memecoin.name }}</h2>
        <p class="text-sm text-gray-700">Symbole : <span class="font-medium">{{ memecoin.symbol }}</span></p>
        <p class="text-sm text-gray-700">{{ memecoin.description }}</p>

        <div v-if="memecoin.logoUrl" class="mt-2">
            <p class="text-sm text-gray-500 mb-1">Logo :</p>
            <img :src="memecoin.logoUrl" alt="Logo du MemeCoin"
                class="w-16 h-16 object-contain rounded-md border border-gray-200" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MemeCoin } from "@/stores/memecoin.ts"

defineProps<{ memecoin: MemeCoin }>()
</script>