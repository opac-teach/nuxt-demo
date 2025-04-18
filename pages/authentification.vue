<template>
  <div class="max-w-md mx-auto p-6">
    <form @submit.prevent="authentificationForm" class="space-y-4">
      <div>
        <label for="password" class="block font-medium mb-1">Mot de passe</label>
        <input v-model="formData.password" type="text" id="password" name="password" placeholder="Mot de passe" required class="w-full border px-3 py-2 rounded"/>
      </div>
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth'
import { onMounted } from 'vue'

const router = useRouter()
const { isAuthenticated } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/formMemeCoin')
  }
})

const formData = ref({
  password: '',
})

const authentificationForm = async () => {
  if (!formData.value.password) {
    alert("Veuillez fournir le mot de passe")
    return
  }

  try {
    const response = await fetch('/api/login-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })

    if (!response.ok) {
      alert("Erreur lors de l'authentification")
      throw new Error("Erreur lors de l'authentification")
    }

    await response.json()
    alert("Authentification réussie")
    router.push('/formMemeCoin')
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la requête')
  }
}
</script>