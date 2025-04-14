<template>
  <div>
    <div>
      <p>
        Status:
        <span v-if="status === 'pending'" class="text-yellow-500"
          >Loading...</span
        >
        <span v-if="!exercice" class="text-yellow-500">Aucune donnée</span>
        <span v-if="status === 'error'" class="text-red-500"
          >Error: {{ error }}</span
        >
        <span v-if="status === 'success'" class="text-green-500">Success</span>
      </p>
    </div>
    <div v-if="exercice">
      <h2>exercice {{ exercice.id }}</h2>
      <ul>
        <li>Name: {{ exercice.name }}</li>
        <li>Email: {{ exercice.email }}</li>
        <li>Created At: {{ exercice.createdAt }}</li>
      </ul>
    </div>
    <UButton @click="refresh">Refresh</UButton>
    <UButton @click="clear">Clear</UButton>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const exerciceId = route.params.id as string;
const { data: exercice, status, error, refresh, clear } = useExercice(exerciceId);

useSeoMeta({
  title: () => `Exercice ${exercice.value?.name}`,
  description: () => `This is exercice ${exercice.value?.name} personal page`,
  ogTitle: () => `Exercice ${exercice.value?.name}`,
  ogDescription: () => `This is exercice ${exercice.value?.name} personal page`,
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
