<script setup lang="ts">
const links = [
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
    label: "Liste",
    icon: "i-heroicons-list-bullet",
    to: "/exercices",
  },
  {
    label: "Création",
    icon: "i-heroicons-plus-circle",
    to: "/coin-form",
  },
  {
    label: "Se connecter",
    icon: "i-heroicons-user",
    to: "/auth-form",
  },
];
</script>

<template>
  <header>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <Profile />
  </header>
</template>
