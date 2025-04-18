<script setup lang="ts">
import { useEtatConnexionStore } from "@/stores/etatConnexion";
const etatConnexion = useEtatConnexionStore() ;

const links = [
  {
    label: "Esteban Russias",
    avatar: {
      src: "/favicon.ico",
    },
    badge: "SSR",
  },
  {
    label: "Exercices",
    icon: "i-heroicons-home",
    to: "/exercices",
  },
  {
    label: "Create",
    icon: "i-heroicons-user",
    to: "/create",
  },
  {
    label: "Connect",
    icon: "i-heroicons-user",
    to: "/connect",
  },
];
</script>

<template>
  <header class="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800">
    <UHorizontalNavigation :links="links" />
    <div class="text-sm font-medium">
      <p>État :</p>
      <span :class="etatConnexion.estConnecte ? 'text-green-600' : 'text-red-600'">
        {{ etatConnexion.estConnecte ? 'Connecté' : 'Déconnecté' }}
      </span>
    </div>
  </header>
</template>
