<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import UsersDetails from "@/components/users/Details.vue";
import UsersDetailsSource from "@/components/users/Details.vue?raw";
import UsersComposableSource from "@/composables/users.ts?raw";

import UsersDetailsGlobal from "@/components/users-global/Details.vue";
import UsersDetailsGlobalSource from "@/components/users-global/Details.vue?raw";
import UsersStoreSource from "@/stores/users.ts?raw";

import Examples from "@/components/Examples.vue";

const examples = [
  {
    name: "Utilisateur (composables)",
    description: "On peut observer et changer l'etat de la requete",
    components: [UsersDetails],
    sources: [UsersDetailsSource, UsersComposableSource],
    sourcesNames: ["UserDetails", "UsersComposable"],
  },
  {
    name: "Utilisateur (stores)",
    description: "On peut observer et changer l'etat de la requete",
    components: [UsersDetailsGlobal],
    sources: [UsersDetailsGlobalSource, UsersStoreSource],
    sourcesNames: ["UserDetailsStore", "UsersStore"],
  },
];
</script>
