<script setup lang="ts">
const username = useUsername();
</script>

<template>
  <div>
    Username: {{ username }}
    <UInput v-model="username" />
  </div>
</template>
