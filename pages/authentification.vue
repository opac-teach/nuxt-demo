<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Authentification</h1>

      <div v-if="isLoggedIn">
        <UButton @click="handleLogout" color="red" class="w-full">Se déconnecter</UButton>
      </div>

      <UForm v-else :state="formData" @submit="authentificationForm" class="space-y-6">
        <UFormGroup label="Mot de Passe" name="password" required>
          <UInput
            v-model="formData.password"
            type="password"
            placeholder="Mot de passe"
          />
        </UFormGroup>

        <UButton type="submit" class="w-full">Se connecter</UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

const formData = ref({ password: '' })
const router = useRouter()

const authCookie = useCookie('auth_token')
const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!authCookie.value
})

const authentificationForm = async () => {
  if (!formData.value.password) {
    return alert('Veuillez fournir le mot de passe')
  }

  try {
    const response = await fetch('/api/login-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData.value)
    })

    const result = await response.json()

    if (!response.ok) {
      return alert(result.message || 'Mot de passe incorrect')
    }

    authCookie.value = result.userId
    formData.value.password = ''
    isLoggedIn.value = true

    alert('Authentification réussie')
    router.push('/exercices')
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la requête')
  }
}

const handleLogout = async () => {
  try {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
    authCookie.value = null
    isLoggedIn.value = false
    alert('Déconnecté avec succès')
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la déconnexion')
  }
}
</script>