<template>
  <div class="w-fit h-fit mx-auto my-50 shadow-md rounded-xl p-6 border">
    <h2 class="text-xl font-semibold mt-1 w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Fiche Utilisateur
    </h2>

    <p class="mt-1 w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span class="font-medium">Nom :</span> {{ userStore.username || 'None' }}
    </p>

    <p class="mt-1 w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span class="font-medium">Age :</span> {{ userStore.age || 0 }}
    </p>

    <p class="mt-1 w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span class="font-medium">Mail :</span> {{ userStore.email || 'name@mail.com' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>
