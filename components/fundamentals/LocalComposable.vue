<script setup lang="ts">
const counter = useLocalCounter();
</script>

<template>
  <div>
    Local Counter Composable: {{ counter.count }}
    <UButton @click="counter.decrement">-</UButton>
    <UButton @click="counter.increment">+</UButton>
  </div>
</template>
