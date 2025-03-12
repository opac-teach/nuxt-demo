<template>
  <div class="w-full overflow-x-scroll max-h-screen overflow-y-scroll">
    <div v-if="name" class="text-md italic text-end mb-2 pr-2">{{ name }}</div>
    <highlightjs
      langage="javascript"
      :code="source"
      class="text-sm m-0 bg-(--hljs-background) p-2 rounded-sm"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  source: string;
  name?: string;
}>();
</script>
