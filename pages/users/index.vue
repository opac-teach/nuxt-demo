<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import UsersList from "@/components/users/List.vue";
import UsersListSource from "@/components/users/List.vue?raw";
import UsersComposableSource from "@/composables/users.ts?raw";

import Examples from "@/components/Examples.vue";

const examples = [
  {
    name: "Utilisateurs",
    description:
      "Pour récuperer des données exterieures, on utilisera <code>useFetch</code>",
    components: [UsersList, UsersList],
    sources: [UsersListSource, UsersComposableSource],
    sourcesNames: ["UsersListSource", "UsersComposableSource"],
  },
];
</script>
