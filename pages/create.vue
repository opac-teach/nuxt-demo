<script setup lang="ts">
import { reactive, ref , watch } from 'vue'

interface createCoin {
    name: string
    symbol: string
    description: string
    logoUrl: string
}

type Errors = Record<string, string | null >

const form = reactive<createCoin>({
    name: '',
    symbol: '',
    description: '',
    logoUrl: ''
})

const errors = reactive<Errors>({
    name: null,
    symbol: null,
    description: null,
    logoUrl: null
})

const successMessage = ref<string | null>(null)


async function publishCoin() {
  // Vérifie s'il y a des erreurs
  if (Object.values(errors).some(error => error !== null)) {
    console.log('Formulaire invalide')
    return
  }

  try {
    const body = JSON.stringify(form)
    console.log('Formulaire soumis:', body)
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })

    if (!response.ok) {
      throw new Error('Échec de la requête')
    }

    console.log('Formulaire valide, coin soumis:', form)
    form.name = ''
    form.symbol = ''
    form.description = ''
    form.logoUrl = ''

  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error)
  }
}

watch(form, (newForm) => {
    form.symbol = newForm.symbol.toUpperCase();
    if (newForm.name.length < 4 || newForm.name.length > 12) {
        errors.name = 'Le name doit faire entre 4 et 12 caractères'
    }else {
        errors.name = null
        form.name = newForm.name.charAt(0).toUpperCase() + newForm.name.slice(1);
    }
    if (newForm.symbol.length > 4) {
        errors.symbol = 'Le symbole doit faire entre 2 et 4 caractères'
    }else {
        errors.symbol = null
    } 
    
    if (newForm.description.length > 1000) {
        errors.description = 'La description doit faire maximum 1000 caractères'
    }else {
        errors.description = null           
    }

})
</script>

<template>
    <div class="w-[50vw] mx-auto">
        <h1 class="text-4xl font-bold text-center text-primary mb-6">Viens créer ta crypto !</h1>
        <form @submit.prevent="publishCoin" class="flex flex-col gap-4">
                <label for="name" class="block">Nom de la crypto (4-12) :</label>
                <input 
                    v-model="form.name" 
                    id="name"
                    class="input w-full"   
                    placeholder="Entrez le name de la crypto"
                    required
                />
            
                <label for="symbol" class="block">Symbol (2-4) :</label>
                <input 
                    v-model="form.symbol" 
                    id="symbol"
                    class="input w-full"
                    placeholder="Entrez le symbole"
                    required
                />
            
                <label for="description" class="block">Description (0-1000) :</label>
                <textarea 
                    v-model="form.description" 
                    id="description"
                    class="input w-full" 
                    placeholder="Décrivez votre crypto"
                    required
                ></textarea>

                <label for="logoUrl" class="block">LogoUrl (0-200) :</label>
                <input v-model="form.logoUrl" id="logoUrl"class="input w-full" placeholder="Entrez l'URL du logo" required/>
            
                <div v-for="[key, error] in Object.entries(errors)" :key="key">
                    <p v-if="error" class="text-red-500">{{ error }}</p>
                    <p v-if="successMessage" class="text-green-500 mt-4 text-center">{{ successMessage }}</p>
                </div>
                <button  type="submit" class="btn bg-primary text-white rounded-xl w-full p-2">
                    Soumettre
                </button>
        </form>
    </div>
</template>
