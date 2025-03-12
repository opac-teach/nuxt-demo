<script setup lang="ts">
const counter = ref(0);
// This will lead to hydration error :
// const counter = ref(Math.random());
</script>

<template>
  <div>
    <p>Ref Counter: {{ counter }}</p>
    <UButton @click="counter--">-</UButton>
    <UButton @click="counter++">+</UButton>
  </div>
</template>
