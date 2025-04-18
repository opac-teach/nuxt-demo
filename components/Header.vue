<script setup lang="ts">
import { computed } from 'vue'
import { useAuthentificationStore } from '../stores/authentificationToken'

const auth = useAuthentificationStore()



const baseLinks = [
  {
    label: "Vue Demo",
    avatar: {
      src: "/favicon.ico",
    },
    badge: "SSR",
  },
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Routing",
    icon: "i-heroicons-share",
    to: "/routing",
  },
  {
    label: "State",
    icon: "i-heroicons-cog",
    to: "/state",
  },
  {
    label: "Data fetching",
    icon: "i-heroicons-user",
    to: "/users",
  },
  {
    label: "Exercices",
    icon: "i-heroicons-user",
    to: "/exercices",
  }
];

const links = computed(() => {
  const authLink = auth.isLoggedIn
    ? {
      label: 'Déconnexion',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => auth.deconnexion(),
    }
    : {
      label: "Authentification",
      icon: "i-heroicons-user",
      to: "/authentification",
    }

  return [...baseLinks, authLink]
})

</script>

<template>
  <header>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
  </header>
</template>
