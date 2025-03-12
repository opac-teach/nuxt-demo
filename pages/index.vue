<template>
  <div class="prose">
    <h1>Bienvenue sur Nuxt !</h1>
    <h2>Particularités par rapport à Vue</h2>
    <ul>
      <li>Rendu côté serveur (SSR)</li>
      <li>Generation entièrement statique possible (SSG)</li>
      <li>Rendu entièrement côté client possible (CSR)</li>
      <li>Imports automatiques (composants, fonctions du framework)</li>
      <li>Routing automatique et structure fixe</li>
      <li>NuxtUI pour un design rapide et efficace</li>
    </ul>
    <h2>Liens utiles</h2>
    <ul>
      <li>
        <a href="https://nuxt.com/">Documentation officielle</a>
      </li>
      <li>
        <a href="https://ui.nuxt.com/">NuxtUI</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "My Amazing Site",
});
</script>
