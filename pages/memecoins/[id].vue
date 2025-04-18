<template>
    <div v-if="memecoin">
      <MemeCoin :memecoin="memecoin" />
    </div>
    <div v-else>
      Pas de memecoin trouvé
    </div>
  </template>
  

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const memecoin = ref(null)



onMounted(async () => {
    
    memecoin.value = await $fetch(`/api/memecoins/${id}`)

    console.log("fetched memecoins : ", memecoin.value)
});



</script>