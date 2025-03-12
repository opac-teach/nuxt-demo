<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main
      class="flex flex-1 container mx-auto w-screen-lg max-w-screen-2xl w-full p-8"
    >
      <slot />
    </main>
    <Footer />
  </div>
</template>
