<script setup lang="ts">
const username = useUsername();
</script>

<template>
  <div>
    <p>Username: {{ username }}</p>
    <UInput v-model="username" />
  </div>
</template>
