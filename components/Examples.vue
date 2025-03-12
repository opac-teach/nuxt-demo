<template>
  <div class="flex w-full flex-col gap-4 container max-w-full">
    <Example
      v-for="(example, index) in examples"
      :key="index"
      :name="example.name"
      :description="example.description"
      :components="example.components"
      :sources="example.sources"
      :sources-names="example.sourcesNames"
    />
  </div>
</template>

<script setup lang="ts">
import { type ExampleProps } from "@/components/Example.vue";

defineProps<{
  examples: Array<ExampleProps>;
}>();
</script>
