<template>
  <div class="prose">
    <p>
      Avec Nuxt, les fichiers sont chacun placés dans un dossier correspondant à
      leur role, et Nuxt va automatiquement les chercher.
    </p>
    <p>Plus besoin de routeur !</p>
    <ul class="list-disc">
      <li>
        <h3>components/</h3>
        <ul class="ml-4">
          <li>
            <h4>Header.vue</h4>
          </li>
          <li>
            <h4>Footer.vue</h4>
          </li>
        </ul>
      </li>
      <li>
        <h3>pages/</h3>
        <ul class="ml-4">
          <li>
            <h4>index.vue</h4>
            <h4>routing.vue</h4>
          </li>
        </ul>
        <ul class="ml-4">
          <li>
            <h4>users/</h4>
            <ul class="ml-4">
              <li>
                <h4>index.vue</h4>
                <h4>[id].vue</h4>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <h3>layouts/</h3>
        <ul class="ml-4">
          <li>
            <h4>default.vue</h4>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
