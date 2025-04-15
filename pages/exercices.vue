<script setup lang="ts">


type Errors = Record<string, string | null >

interface Login {
    password: string;
}

const loginForm = reactive<Login>({
    password: "",
});

interface CreateCoin {
    name: string;
    symbol: string;
    description: string;
    logoUrl: string | undefined;
}

const form = reactive<CreateCoin>({
    name: "",
    symbol: "",
    description: "",
    logoUrl: ""
});

let errors = reactive<Errors>({
    name: null,
    symbol: null,
    description: null,
    logoUrl: null
});

watch(form, (newform) => {
    form.symbol = newform.symbol.toUpperCase();
    if ((newform.name.length < 4 || newform.name.length > 16) && newform.name !== "") {
        errors.name = "Le nom doit faire entre 4 et 16 caracteres";
    } else {
        errors.name = null;
    }
    if ((newform.symbol.length > 4 || newform.symbol.length < 2) && newform.symbol !== "") {
        errors.symbol = "Le symbole doit faire entre 2 et 4 caracteres";
    } else {
        errors.symbol = null;
    }
    if ((newform.description.length > 1000) && newform.description !== "") {
        errors.description = "La description doit faire moins de 1000 caracteres";
    } else {
        errors.description = null;
    }
});

async function publishCoin(){
    const url = "https://nuxt-demo-blush.vercel.app/api/create-memecoin"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });  
        if (response.status === 400){
            throw new Error("400 Bad Request")
        }
        if (response.status === 500){
            throw new Error("500 Internal Server Error")
        }
        if (response.status === 200){
            const data = await response.json()
            alert("Votre coin a été publié avec succès !");
        }
    } catch (error) {
        alert("Erreur de connexion au serveur : " + error);
        }
    }


async function getCoins(){
    return useFetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins`, {
        method: "GET",
    });
}
 const { data: coins } = await getCoins()


</script>
  
<template>
    <div class="mx-auto p-4 w-8/15 rounded-lg bg-gray-200">
        <h1 class="text-4xl text-center mb-8 text font-bold" >Liste des MemeCoins Disponible sur la plateforme</h1>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <li v-for="coin in coins" :key="coin.id">
                <div class="flex items-center justify-between bg-gray-800 p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img :src="coin.logoUrl" alt="Logo du coin" class="h-16 w-16 rounded-full object-cover mr-4" />
                    <div class="flex flex-col">
                        <span class="text-green-500 font-bold text-xs">{{ coin.name }}</span>
                        <span class=" text-xl font-bold">#{{ coin.symbol }}</span>
                    </div>
                    <button class="btn bg-green-700 text-white text-xs">Acheter</button>
                </div>
            </li>
        </ul>

    </div>

    <div class="w-1/15"></div>
    
    <div class="w-6/15 mx-auto p-4 bg-gray-200 rounded-lg shadow-md">

        <div >
            <h1 class="text-4xl text-center mb-8 text font-bold">Bienvenue sur Create Coin</h1>
        </div>

        <form class=" flex-column" @submit.prevent="publishCoin">

            <div class="mt-10">
                <label for="name" class=" border-3 text-xl font-medium text-gray-700">Nom du coin : </label>
                <input class=""ref="input" required placeholder="4-16 caractères" v-model="form.name"/>
            </div>

            <div class="mt-10">
                <label for="symbol" class=" text-xl font-medium text-gray-700">Symbole : </label>
                <input class="" ref="input" required placeholder="2-4 caractères" v-model="form.symbol"/>
            </div>

            <div class="mt-10">
                <label for="description" class=" text-xl font-medium text-gray-700">Description : </label>
                <input ref="input" required placeholder="Max 1000 caractères" v-model="form.description"/>
            </div>

            <div class="mt-10">
                <label for="logoUrl" class=" text-xl font-medium text-gray-700">URL du logo de votre coin : </label>
                <input  ref="input" placeholder="facultatif" v-model="form.logoUrl"/>
            </div>

            <div v-for="[key, error] in Object.entries(errors)" :key="key">
                <p v-if="error">{{ error }}</p>
            </div>

            <button class=" mt-10 flex justify-self-center btn bg-green-700 text-white text-s p-4 br-50 rounded-lg" type="submit">Creer votre coin</button>
        </form>
    </div>
</template>



