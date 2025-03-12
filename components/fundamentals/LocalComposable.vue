<script setup lang="ts">
const counter = useLocalCounter();
</script>

<template>
  <div>
    <p>Local Counter Composable: {{ counter.count }}</p>
    <UButton @click="counter.decrement">-</UButton>
    <UButton @click="counter.increment">+</UButton>
  </div>
</template>
