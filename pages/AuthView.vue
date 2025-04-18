<script setup lang="ts">

import { useConnexionStore } from "../stores/etatConnexion";
const connexionStore = useConnexionStore()

interface Login {
    password: string;
}

const loginForm = reactive<Login>({
    password: "",
});




async function login(){
    const url = "/api/login-cookie"
    try {
        const data = await $fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginForm)
        });  
        alert("Connexion réussie !");
    } 
    catch (error : any) {
        console.log(error)
        if (error.response.status == 401) {
            alert("Mot de passe incorrect");
        }
        else if (error.response.status == 500) {
            alert("Erreur interne du serveur");
        }
        else {
        alert(" Erreur lors de la connexion: " + error);
        }
    }
}
      

</script>


<template>
  <div class="max-w-md mx-auto p-6 rounded-2xl bg-gray-800 shadow-lg">
    <div v-if="!connexionStore.etat">
      <h1 class="text-4xl text-center font-bold mb-6 text-white">Veuillez vous connecter</h1>
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <label for="password" class="text-lg font-semibold text-gray-300">Mot de passe</label>
        <input
          id="password"
          type="password"
          v-model="loginForm.password"
          required
          class="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          class="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
        >
          Connexion
        </button>
      </form>
    </div>

    <div v-else>
      <h1 class="text-4xl text-center font-bold mb-6 text-white">Vous êtes connecté</h1>
      <button
        @click="connexionStore.deleteCookie()"
        class="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors w-full"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>
  