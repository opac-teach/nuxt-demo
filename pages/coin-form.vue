<template>
  <div class="m-auto p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Créer un MemeCoin</h1>

    <div v-if="successMsg" class="fixed top-20 right-4 z-50 px-4 py-2 bg-green-500/75 rounded shadow transition-all duration-300 text-white text-sm">
      {{ successMsg }}
    </div>

    <div v-if="authStore.isAuthenticated" class="shadow-md rounded-xl p-6 border">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Nom :</label>
          <input type="text" id="name" v-model="formData.name" required class="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <p v-if="errors.name" class="text-red-500 text-sm mt-1" >{{ errors.name }}</p>
        </div>

        <div>
          <label for="symbol" class="block text-sm font-medium">Symbole :</label>
          <input type="text" id="symbol" v-model="formData.symbol" required class="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <p v-if="errors.symbol" class="text-red-500 text-sm mt-1">{{ errors.symbol }}</p>
        </div>

        <div>
          <label for="description" class="block text-sm font-medium">Description :</label>
          <textarea id="description" v-model="formData.description" class="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
        </div>

        <div>
          <label for="logoUrl" class="block text-sm font-medium">Logo (URL) :</label>
          <input type="url" id="logoUrl" v-model="formData.logoUrl" class="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <p v-if="errors.logoUrl" class="text-red-500 text-sm mt-1">{{ errors.logoUrl }}</p>
        </div>

        <div class="flex justify-center mb-6">
          <button type="submit"
                  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="!isFormValid"
          >
            Créer le Memecoin
          </button>
        </div>
      </form>
    </div>

    <div v-else>
      <p>Pour afficher plus d'informations, une connexion est requise !</p>
      <div class="flex justify-center mt-5 mb-6">
        <RouterLink to="/auth-form" class="btn">Se connecter</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, computed, watch } from "vue";
import { useMemecoinStore } from "@/stores/memeCoinsStore";
import { useAuthStore } from "@/stores/authStore";
import { RouterLink } from "vue-router";

const successMsg = ref("");
const formData = ref({ name: "", symbol: "", description: "", logoUrl: "" });
const errors = ref({ name: "", symbol: "", description: "", logoUrl: "", api: "" });
const store = useMemecoinStore();
const ignoreWatch = ref(false);
const authStore = useAuthStore();

watch(() => formData.value.name, (newVal) => {

  if (ignoreWatch.value) return;

  if (newVal.length < 4 || newVal.length > 16) {
    errors.value.name = "Le nom doit contenir entre 4 et 16 caractères.";
  } else {
    errors.value.name = "";
  }
});

watch(() => formData.value.symbol, (newVal) => {

  const symbolRegex = /^[A-Z]{2,4}$/;

  if (ignoreWatch.value) return;

  if (!symbolRegex.test(newVal)) {
    errors.value.symbol = "Le symbole doit être en majuscules et contenir entre 2 et 4 lettres.";
  } else {
    errors.value.symbol = "";
  }
});

watch(() => formData.value.description, (newVal) => {

  if (ignoreWatch.value) return;

  if (newVal.length > 1000) {
    errors.value.description = "La description ne peut pas dépasser 1000 caractères.";
  } else {
    errors.value.description = "";
  }
});

watch(() => formData.value.logoUrl, (newVal) => {

  if (ignoreWatch.value) return;

  if (newVal && !/^https?:\/\/.+\..+/.test(newVal)) {
    errors.value.logoUrl = "L’URL du logo est invalide.";
  } else {
    errors.value.logoUrl = "";
  }
});

const validateForm = () => {
  let valid = true;
  errors.value = { name: "", symbol: "", description: "", logoUrl: "", api: "" };

  if (formData.value.name.length < 4 || formData.value.name.length > 16) {
    errors.value.name = "Le nom doit contenir entre 4 et 16 caractères.";
    valid = false;
  }

  const symbolRegex = /^[A-Z]{2,4}$/;
  if (!symbolRegex.test(formData.value.symbol)) {
    errors.value.symbol = "Le symbole doit être en majuscules et contenir entre 2 et 4 lettres.";
    valid = false;
  }

  if (formData.value.description.length > 1000) {
    errors.value.description = "La description ne peut pas dépasser 1000 caractères.";
    valid = false;
  }

  if (formData.value.logoUrl && !/^https?:\/\/.+\..+/.test(formData.value.logoUrl)) {
    errors.value.logoUrl = "L’URL du logo est invalide.";
    valid = false;
  }

  return valid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const response = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify(formData.value)
    });

    if (!response.ok) throw new Error("Échec de la création du memecoin");

    await store.fetchAll();

    ignoreWatch.value = true;
    formData.value = { name: "", symbol: "", description: "", logoUrl: "" };
    errors.value = { name: "", symbol: "", description: "", logoUrl: "", api: "" };

    setTimeout(() => {
      ignoreWatch.value = false;
    }, 100);

    successMsg.value = "MemeCoin créé avec succès ! 🎉";
    setTimeout(() => {
      successMsg.value = "";
    }, 1500);

  } catch (error) {
    console.error("Erreur lors de la création du memecoin:", error);
    errors.value.api = "Une erreur est survenue. Veuillez réessayer.";
  }
};

const isFormValid = computed(() => {
  return (
      formData.value.name.length >= 4 &&
      formData.value.name.length <= 16 &&
      /^[A-Z]{2,4}$/.test(formData.value.symbol) &&
      formData.value.description.length <= 1000 &&
      (!formData.value.logoUrl || /^https?:\/\/.+\..+/.test(formData.value.logoUrl)) &&
      !errors.value.name &&
      !errors.value.symbol &&
      !errors.value.description &&
      !errors.value.logoUrl
  );
});

</script>
