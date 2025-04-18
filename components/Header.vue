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
    icon: "i-heroicons-user-group",
    to: "/exercices",
  },
  {
    label: "login",
    icon: "i-heroicons-user-group",
    to: "/login",
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
