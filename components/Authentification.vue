<template>
    <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h1 class="text-2xl font-bold text-center mb-6">Authentifiez-vous</h1>

        <form @submit.prevent="submitForm" class="space-y-4">
            <div class="form-control flex flex-col">
                <label for="password" class="mb-1 font-semibold">Mot de passe</label>
                <input type="password" v-model="formData.password" id="password" placeholder="Mot de passe" required
                    class="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <button type="submit" :disabled="isLoading"
                class="w-full bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50">
                {{ isLoading ? 'Connexion...' : 'Authentification' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthentificationStore } from '@/stores/authentificationToken.ts'

const authStore = useAuthentificationStore()

const formData = ref<{ password: string }>({
    password: ''
})

const isLoading = ref(false)

const submitForm = async () => {
    if (!formData.value.password) {
        alert('Veuillez remplir le champ mot de passe.')
        return
    }

    isLoading.value = true

    try {
        const response = await fetch('/api/login-cookie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData.value)
        })

        if (!response.ok) {
            alert("Erreur d'authentification")
            throw new Error("Échec de l'authentification")
        }

        const authInfo = await response.json()
        alert('Authentification réussie !')
        formData.value.password = ''
        navigateTo('/') 
    } catch (error) {
        console.error(error)
        alert('Erreur lors de la requête')
    } finally {
        isLoading.value = false
    }
}
</script>