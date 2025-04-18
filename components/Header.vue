<script setup lang="ts">
import { useUser } from '@/stores/user';

const userStore = useUser();

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
    to: "/exercices",
  }
];
</script>

<template>
  <header>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <div class="flex justify-end p-2">
      <NuxtLink v-if="!userStore.loggedIn" to="/exercices">
        <UButton>Login</UButton>
      </NuxtLink>
      <UButton v-else @click="userStore.logout">Logout</UButton>
    </div>
  </header>
</template>