<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Exercices</h1>

    <div v-if="authStore.isAuthenticated">
<!--    <div>-->
      <div class="flex justify-center mb-6">
        <RouterLink to="/coin-form" class="btn btn-blue">Créer un MemeCoin</RouterLink>
      </div>

      <h2 v-if="store.list" class="text-2xl font-semibold mb-4">Meme coins list :</h2>
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-300 rounded-xl shadow-md">

          <thead class="text-left">
          <tr>
            <th class="border px-4 py-2 text-center">Owner</th>
            <th class="border px-4 py-2 text-center">Name</th>
            <th class="border px-4 py-2 text-center">Symbol</th>
            <th class="border px-4 py-2">Description</th>
            <th class="border px-4 py-2 text-center">Logo</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(value, key) in store.list.slice(-5).reverse()" :key="key">
            <td class="border px-4 py-2 text-center">{{ userStore.username }}</td>
            <td class="border px-4 py-2 text-center">{{ value.name }}</td>
            <td class="border px-4 py-2 text-center">{{ value.symbol }}</td>
            <td class="border px-4 py-2">
              <p class="break-words text-justify max-w-md max-h-[100px] overflow-y-auto pr-1">{{ value.description }}</p>
            </td>
            <td class="border px-4 py-2 text-center">
              <img :src="value.logoUrl" alt="logo" class="w-16 h-16 rounded-md object-cover inline-block">
            </td>
          </tr>
          </tbody>

        </table>
      </div>
    </div>

    <div v-else>
      <p>Pour afficher plus d'informations, une connexion est requise !</p>
      <div class="flex justify-center mt-5 mb-6">
        <RouterLink to="/auth-form" class="btn">Se connecter</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';
import { useMemecoinStore } from '@/stores/memeCoinsStore';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

const store = useMemecoinStore();
const authStore = useAuthStore();
const userStore = useUserStore();

let intervalId: ReturnType<typeof setInterval>

onMounted(async () => {
  await store.fetchAll();
  intervalId = setInterval(() => {
    store.fetchAll();
  }, 30000);
});

onUnmounted(async () => {
  clearInterval(intervalId);
});

</script>
