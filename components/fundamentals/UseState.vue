<script setup lang="ts">
const counter = useState("counter", () => 0);
// This will work because it's made to be calculated only once
// const counter = useState("counter", () => Math.random());
</script>

<template>
  <div>
    <p>UseState Counter: {{ counter }}</p>
    <UButton @click="counter--">-</UButton>
    <UButton @click="counter++">+</UButton>
  </div>
</template>
