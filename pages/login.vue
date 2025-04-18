<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl mb-4">Login</h1>
    <UserLogin />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
});
</script>