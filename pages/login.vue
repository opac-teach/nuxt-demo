<script setup lang="ts">

import { useEtatConnexionStore } from "../stores/cookie.ts";
const etatConnexionStore = useEtatConnexionStore()

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
        console.log(data)
        console.log(data.userId)
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
    <div class=" mx-auto p-4 w-full rounded-lg bg-gray-200">

        <div v-if="!etatConnexionStore.etat">
            <div >
                <h1 class="text-6xl text-center mb-8 text font-bold">Veuillez vous connecter</h1>
            </div>
            <form class=" flex-column" @submit.prevent="login">

                <div class="justify-self-center ">
                    <label for="password" class=" border-3 text-xl font-medium text-gray-700">Mot de passe : </label>
                    <input class = " bg-white text-black rounded-s" ref="input" required placeholder="" type="password" v-model="loginForm.password"/>
                </div>
                <button class=" mt-10 flex justify-self-center btn bg-green-700 text-white text-s p-3 br-50 rounded-lg" type="submit">Connexion</button>            
            </form>
        </div>

        <div v-else>
            <div >
                    <h1 class="text-6xl text-center mb-8 text font-bold">Vous êtes connecté</h1>
            </div>
            <button class=" mt-10 flex justify-self-center btn bg-red-700 text-white text-s p-3 br-50 rounded-lg" @click="etatConnexionStore.deconnecter()">Déconnexion</button>

        </div>

    </div>
</template>
