<script setup lang="ts">
const counter = useCounter();
</script>

<template>
  <div>
    Global Counter: {{ counter.count }}
    <UButton @click="counter.decrement">-</UButton>
    <UButton @click="counter.increment">+</UButton>
  </div>
</template>
