<script setup lang="ts">
const counter = useCounter();
</script>

<template>
  <div>
    <p>Global Counter: {{ counter.count }}</p>
    <UButton @click="counter.decrement">-</UButton>
    <UButton @click="counter.increment">+</UButton>
  </div>
</template>
