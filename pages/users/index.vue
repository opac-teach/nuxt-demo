<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import UsersList from "@/components/users/List.vue";
import UsersListSource from "@/components/users/List.vue?raw";
import UsersComposableSource from "@/composables/users.ts?raw";

import UsersListGlobal from "@/components/users-global/List.vue";
import UsersListGlobalSource from "@/components/users-global/List.vue?raw";
import UsersStoreSource from "@/stores/users.ts?raw";

import Examples from "@/components/Examples.vue";

const examples = [
  {
    name: "Utilisateurs (composables)",
    description:
      "Pour récuperer des données exterieures, on utilisera <code>useFetch</code>, qui empechera que la requete soit lancée deux fois, une sur le serveur et une sur le client. <br/> Cependant, elle sera lancée autant de fois que de composants l'utilisent ",
    components: [UsersList, UsersList],
    sources: [UsersListSource, UsersComposableSource],
    sourcesNames: ["UsersList", "UsersComposable"],
  },
  {
    name: "Utilisateurs (stores)",
    description:
      "Si une donnée récupérée d'une API doit être utilisée a plusieurs endroits, on aura tendance à la stocker dans un store Pinia",
    components: [UsersListGlobal, UsersListGlobal],
    sources: [UsersListGlobalSource, UsersStoreSource],
    sourcesNames: ["UsersStoreList", "UsersStore"],
  },
];
</script>
