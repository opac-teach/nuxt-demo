<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue' 
import { useEtatConnexionStore } from '@/stores/etatConnexion'

const etatConnexion = useEtatConnexionStore()


interface login {
  password: string
}

type Errors = Record<string, string | null>

const form = reactive<login>({
  password: ''
})

const errors = reactive<Errors>({
  password: null,
})

const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

async function loginTest() {
  if (Object.values(errors).some(error => error !== null)) {
    console.log('Formulaire invalide')
    return
  }

  try {
    const response = await fetch("/api/login-cookie", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) {
      if (response.status === 401) {
        errorMessage.value = "Mot de passe incorrect"
      }
      throw new Error(`Erreur API: ${response.status}`)
    }


    successMessage.value = 'Vous êtes connecté !'
    errorMessage.value = null
    form.password = ''

    const data = await response.json()
    console.log('Réponse API:', data)

    setTimeout(() => {
      successMessage.value = null
    }, 2000)

  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
  }
}

watch(form, (newForm) => {
  errors.password = newForm.password.length < 4
    ? 'Le mot de passe doit faire plus de 4 caractères'
    : null
})
</script>


<template>
  <div class="w-[50vw] mx-auto">
    <h1 class="text-4xl font-bold text-center text-primary mb-6">Connecte-toi !</h1>
    <form @submit.prevent="loginTest" class="flex flex-col gap-4">
      <label for="password" class="block">Password :</label>
      <input 
        v-model="form.password" 
        id="password"
        class="input w-full"   
        placeholder="Entrez le password"
        required
      />

      <!-- Message d'erreur de validation -->
      <div v-for="[key, error] in Object.entries(errors)" :key="key">
        <p v-if="error" class="text-red-500">{{ error }}</p>
      </div>

      <!-- Message d'erreur API -->
      <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>

      <!-- Message de succès -->
      <p v-if="successMessage" class="text-green-500 mt-4 text-center">{{ successMessage }}</p>

      <button type="submit" class="btn bg-primary text-white rounded-xl w-full p-2">
        Se connecter
      </button>
    </form>
    <button
        v-if="etatConnexion.estConnecte"
        type="button"
        @click="etatConnexion.deconnecter()"
        class="btn bg-red-500 text-white rounded-xl w-full p-2"
        >
        Se déconnecter
    </button>
   
  </div>
</template>
