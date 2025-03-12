<template>
  <div class="border-b border-gray-200 last:border-b-0">
    <div class="prose w-full">
      <h2 class="">{{ name }}</h2>
      <p v-if="description" class="mb-4 w-full px-4" v-html="description" />
    </div>

    <div class="flex flex-row gap-4">
      <div
        v-if="components.length > 0"
        :class="sources.length > 0 ? 'w-1/3' : 'w-full'"
      >
        <div
          class="border border-gray-300 rounded-md p-2 m-2"
          v-for="(component, index) in components"
          :key="index"
        >
          <component :is="component" />
        </div>
      </div>
      <div
        v-if="sources.length > 0"
        :class="components.length > 0 ? 'w-2/3' : 'w-full'"
      >
        <div class="flex flex-col gap-4">
          <CodeSnippet
            v-for="(source, index) in sources"
            :key="source"
            :source="source"
            :name="sourcesNames && sourcesNames[index]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

export interface ExampleProps {
  name: string;
  description?: string;
  components: Array<string | Component>;
  sources: Array<string>;
  sourcesNames?: Array<string>;
}

defineProps<ExampleProps>();
</script>
