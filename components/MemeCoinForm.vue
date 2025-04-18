<template>
    <div class="w-full m-full">
      <h1>Créer un MemeCoin</h1>
      <br>
      <form @submit.prevent="submitForm" class="space-y-4 bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto">
        <div class="form-control flex flex-col">
          <label for="name">Nom</label>
          <input v-model="formData.name" type="text" id="name" name="name" placeholder="Nom du MemeCoin" required
            class="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
  
        <div class="form-control flex flex-col">
          <label for="symbol">Symbole</label>
          <input v-model="formData.symbol" type="text" id="symbol" name="symbol" placeholder="Symbole du MemeCoin"
            required
            class="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
  
        <div class="form-control flex flex-col">
          <label for="description">Description</label>
          <textarea v-model="formData.description" id="description" name="description"
            placeholder="Description du MemeCoin"
            class="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>
  
        <div class="form-control flex flex-col">
          <label for="logoUrl">Logo URL</label>
          <input v-model="formData.logoUrl" type="text" id="logoUrl" name="logoUrl" placeholder="URL du logo du MemeCoin"
            class="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
  
        <button type="submit"
          class="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-indigo-700 transition">Créer le
          MemeCoin</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useMemecoinStore, type Memecoin } from '@/stores/memecoin.ts'
  import { useAuthentificationStore } from '@/stores/authentificationToken.ts'

  const memeCoinStore = useMemecoinStore()
  const authInfo = useAuthentificationStore()
  console.log(authInfo.isLoggedIn)
  
  const formData = ref<Memecoin>({
    name: '',
    symbol: '',
    description: '',
    logoUrl: ''
  })
  
  const submitForm = async () => {
    if (!authInfo.isLoggedIn) {
      alert('Vous devez être authentifié pour créer un MemeCoin.')
      return
    }
  
    if (!formData.value.name || !formData.value.symbol) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }
  
    if (
      formData.value.name.length < 4 ||
      formData.value.name.length > 16 ||
      formData.value.symbol.length < 2 ||
      formData.value.symbol.length > 4 ||
      formData.value.logoUrl.length > 200 ||
      formData.value.description.length > 1000
    ) {
      alert(
        'Faites attention aux limites de caractères :\nNom : 4-16 caractères\nSymbole : 2-4 caractères\nLogo URL : 200 caractères max\nDescription : 1000 caractères max'
      )
      return
    }
  
    try {
      const response = await fetch('/api/create-memecoin-protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
        credentials: 'include'
      })
  
      if (!response.ok) {
        alert('Erreur lors de la création du MemeCoin')
        throw new Error('Erreur lors de la création du MemeCoin')
      }
  
      memeCoinStore.addCoin(formData.value)
      alert('MemeCoin créé avec succès !')
      formData.value = { name: '', symbol: '', description: '', logoUrl: '' }
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la requête')
    }
  }
  </script>
  