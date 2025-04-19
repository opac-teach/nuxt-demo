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
    label: "Exercices",
    icon: "i-heroicons-user",
    to: "/exercices"
  },
  {
    label: "Authentification",
    icon: "i-heroicons-user",
    to: "/authentification"
  },
  {
    label: "FormMemeCoin",
    icon: "i-heroicons-user",
    to: "/formMemeCoin"
  },
];
</script>

<template>
  <header>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
  </header>
</template>
