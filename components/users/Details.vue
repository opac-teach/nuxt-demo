<template>
  <div>
    <div>
      <p>
        Status:
        <span v-if="status === 'pending'" class="text-yellow-500"
          >Loading...</span
        >
        <span v-if="!user" class="text-yellow-500">Aucune donnée</span>
        <span v-if="status === 'error'" class="text-red-500"
          >Error: {{ error }}</span
        >
        <span v-if="status === 'success'" class="text-green-500">Success</span>
      </p>
    </div>
    <div v-if="user">
      <h2>User {{ user.id }}</h2>
      <ul>
        <li>Name: {{ user.name }}</li>
        <li>Email: {{ user.email }}</li>
        <li>Created At: {{ user.createdAt }}</li>
      </ul>
    </div>
    <UButton @click="refresh">Refresh</UButton>
    <UButton @click="clear">Clear</UButton>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const userId = route.params.id as string;
const { data: user, status, error, refresh, clear } = useUser(userId);

useSeoMeta({
  title: () => `User ${user.value?.name}`,
  description: () => `This is user ${user.value?.name} personal page`,
  ogTitle: () => `User ${user.value?.name}`,
  ogDescription: () => `This is user ${user.value?.name} personal page`,
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
