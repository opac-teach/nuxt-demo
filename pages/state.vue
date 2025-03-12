<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import LocalState from "@/components/fundamentals/LocalState.vue";
import LocalStateSource from "@/components/fundamentals/LocalState.vue?raw";

import GlobalStore from "@/components/fundamentals/GlobalStore.vue";
import GlobalStoreComponentSource from "@/components/fundamentals/GlobalStore.vue?raw";
import GlobalStoreSource from "@/stores/use-counter.ts?raw";

import Username from "@/components/fundamentals/Username.vue";
import UsernameSource from "@/components/fundamentals/Username.vue?raw";
import UsernameComposableSource from "@/composables/username.ts?raw";

import LocalComposableComponent from "@/components/fundamentals/LocalComposable.vue";
import LocalComposableComponentSource from "@/components/fundamentals/LocalComposable.vue?raw";
import LocalComposableComposable from "@/composables/local-counter.ts?raw";

import UseState from "@/components/fundamentals/UseState.vue";
import UseStateSource from "@/components/fundamentals/UseState.vue?raw";

import Examples from "@/components/Examples.vue";

const examples = [
  {
    name: "LocalState",
    description:
      "Il est encore possible d'utiliser <code>ref</code> pour de l'etat local, mais il faut faire attention à sa valeur initiale.",
    components: [LocalState, LocalState],
    sources: [LocalStateSource],
    sourcesNames: ["LocalState"],
  },
  {
    name: "Global Store",
    description: "Pour les variables globales, on utilisera encore Pinia",
    components: [GlobalStore, GlobalStore],
    sources: [GlobalStoreComponentSource, GlobalStoreSource],
    sourcesNames: ["GlobalStoreComponent", "GlobalStore"],
  },
  {
    name: "Client Only fetching",
    description:
      "Il est parfois necessaire d'acceder à des fonctions seulement dispo coté client.",
    components: [Username],
    sources: [UsernameSource, UsernameComposableSource],
    sourcesNames: ["Username", "UsernameComposable"],
  },
  {
    name: "Local composable",
    description:
      "On peut toujours utiliser les ref dans des composables, mais encore attention aux valeurs intiales",
    components: [LocalComposableComponent, LocalComposableComponent],
    sources: [LocalComposableComponentSource, LocalComposableComposable],
    sourcesNames: [
      "LocalComposableComponentSource",
      "LocalComposableComposable",
    ],
  },
  {
    name: "UseState",
    description:
      "UseState est fait pour être resilient aux changements de valeur initiale, et sa valeur est transferée au client lors de l'hydration. <br/> Ce pendant sa valeur est globale et partagée dans l'app. ",
    components: [UseState, UseState],
    sources: [UseStateSource],
  },
];
</script>
