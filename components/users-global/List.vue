<template>
  <h2>User Ids</h2>
  <ul>
    <li v-for="id in userStore.userIds" :key="id">
      <NuxtLink :to="`/users/${id}`">
        <UButton>User {{ id }}</UButton>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const userStore = useUsersStore();

await callOnce("user", () => userStore.fetchUserIds());
</script>
