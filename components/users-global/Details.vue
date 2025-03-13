<template>
  <div>
    <div>
      <p>
        Status:
        <span v-if="user" class="text-green-500">Chargée</span>
        <span v-if="!user" class="text-yellow-500">En cours de chargement</span>
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
    <UButton @click="userStore.fetchUser(userId)">Refresh</UButton>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const userStore = useUsersStore();

const userId = route.params.id as string;
const user = computed(() => userStore.user(userId));

await callOnce(`user-${userId}`, () => userStore.fetchUser(userId));

useSeoMeta({
  title: () => `User ${user.value?.name}`,
  description: () => `This is user ${user.value?.name} personal page`,
  ogTitle: () => `User ${user.value?.name}`,
  ogDescription: () => `This is user ${user.value?.name} personal page`,
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
