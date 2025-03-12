<script setup lang="ts">
const counter = ref(0);
// This will lead to hydration error :
// const counter = ref(Math.random());
</script>

<template>
  <div>
    Ref Counter: {{ counter }}
    <UButton @click="counter--">-</UButton>
    <UButton @click="counter++">+</UButton>
  </div>
</template>
