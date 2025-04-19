<template>
  <div v-if="authStore.isAuthenticated" class="flex justify-center items-center min-h-screen">
    <UForm
      :state="formData"
      @submit="submitForm"
      class="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 class="text-2xl font-bold text-gray-800 text-center">Créer un MemeCoin</h2>

      <UFormGroup label="Nom" name="name" required>
        <UInput v-model="formData.name" placeholder="Nom du MemeCoin" />
      </UFormGroup>

      <UFormGroup label="Symbole" name="symbol" required>
        <UInput v-model="formData.symbol" placeholder="Symbole du MemeCoin" />
      </UFormGroup>

      <UFormGroup label="Description" name="description">
        <UTextarea v-model="formData.description" placeholder="Description du MemeCoin" rows="4" />
      </UFormGroup>

      <UFormGroup label="Logo URL" name="logoUrl">
        <UInput v-model="formData.logoUrl" placeholder="URL du logo du MemeCoin" />
      </UFormGroup>

      <UButton type="submit" class="w-full">Créer le MemeCoin</UButton>
    </UForm>
  </div>

  <div v-else class="text-center mt-20">
    <p class="text-lg text-gray-700 mb-4">Vous devez être connecté pour créer un MemeCoin.</p>
    <NuxtLink
      to="/auth"
      class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Se connecter
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const submitForm = async () => {
  // Validation
  if (!formData.value.name || formData.value.name.length < 4 || formData.value.name.length > 16) {
    return alert('Nom : 4-16 caractères')
  }
  if (!formData.value.symbol || !/^[A-Z]{2,4}$/.test(formData.value.symbol)) {
    return alert('Symbole : 2-4 lettres MAJUSCULES')
  }
  if (formData.value.description.length > 1000) {
    return alert('Description : max 1000 caractères')
  }
  if (formData.value.logoUrl && !/^https?:\/\/.{3,}/.test(formData.value.logoUrl)) {
    return alert('Logo URL invalide')
  }

  try {
    const res = await fetch('/api/create-memecoin-protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(formData.value)
    })

    const result = await res.json()
    if (!res.ok) {
      return alert(result.message || 'Erreur lors de la création')
    }

    formData.value = { name: '', symbol: '', description: '', logoUrl: '' }
    alert('MemeCoin créé avec succès !')
    router.push('/exercices')
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la requête')
  }
}
</script>