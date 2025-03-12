<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import UsersDetails from "@/components/users/Details.vue";
import UsersDetailsSource from "@/components/users/Details.vue?raw";
import UsersComposableSource from "@/composables/users.ts?raw";

import Examples from "@/components/Examples.vue";

const examples = [
  {
    name: "Utilisateur",
    description: "On peut observer et changer l'etat de la requete",
    components: [UsersDetails],
    sources: [UsersDetailsSource, UsersComposableSource],
    sourcesNames: ["UserDetailsSource", "UsersComposableSource"],
  },
];
</script>
