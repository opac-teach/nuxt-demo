<template>
  <UserLogin v-if="!userStore.loggedIn" />
  <

  <form v-if="userStore.loggedIn" @submit.prevent="createCoin" class="flex flex-col justify-between h-full">
    <label for="name" class="mt-2">Name (4-16 characters, required)</label>
    <input
        type="text"
        id="name"
        v-model="coinForm.name"
        required
        minlength="4"
        maxlength="16"
    />

    <label for="symbol" class="mt-2">Symbol (2-4 uppercase letters, required)</label>
    <input
        id="symbol"
        v-model="coinForm.symbol"
        type="text"
        required
        minlength="2"
        maxlength="4"
        pattern="[A-Z]+"
    />

    <label for="description" class="mt-2">Description (0-1000 characters, optional)</label>
    <textarea
        id="description"
        v-model="coinForm.description"
        maxlength="1000"
    ></textarea>

    <label for="logoUrl" class="mt-2">Logo URL (optional, valid URL)</label>
    <input
        id="logoUrl"
        v-model="coinForm.logoUrl"
        type="url"
        maxlength="200"
    />

    <button class="btn mt-3.5" type="submit">Create Coin</button>
  </form>

  <h2 v-if="coinStore.loading">Loading Coins</h2>

  <div v-else-if="!coinStore.error" v-for="coin in coinStore.coins" :key="coin.id" class="mt-[50px] flex flex-col">
    <img class="h-[200px] w-[200px]" :src="coin.logoUrl" alt="Coin logo" />
    <p>{{ coin.name }} : {{ coin.symbol }}</p>
  </div>

  <div v-else>
    <p>{{ coinStore.error }}</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, watch } from 'vue'
  import { useCoin } from "@/stores/coin"
  import { useUser } from '@/stores/user'
  import UserLogin from '@/components/UserLogin.vue'

  import type { Coin } from "@/stores/coin"

  const coinStore = useCoin()
  const userStore = useUser()
  const isHydrated = ref(false)

  const coinForm = reactive<Coin>({
    name: "",
    symbol: "",
    description: "",
    logoUrl: "",
  })

  await callOnce(() => coinStore.getCoins());

      // console.log("a")
  // await useAsyncData('coins', () => coinStore.getCoins())
  // onMounted(async() => {
  //   isHydrated.value = true
    // await coinStore.getCoins()
  // })

  function isValidUrl(url: string) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  function checkForm(form: Coin) {
    const errors = [];
    if (!form.name || form.name.length < 4 || form.name.length > 16) {
      errors.push('Name must be between 4 and 16 characters.')
    }
    if (!form.symbol || !/^[A-Z]{2,4}$/.test(form.symbol)) {
      errors.push('Symbol must be 2 to 4 uppercase letters.')
    }
    if (form.description && form.description.length > 1000) {
      errors.push('Description must not exceed 1000 characters.')
    }
    if (form.logoUrl) {
      if (form.logoUrl.length > 200) {
        errors.push('Logo URL must not exceed 200 characters.')
      } else if (!isValidUrl(form.logoUrl)) {
        errors.push('Logo URL must be a valid URL.')
      }
    }

    return errors
  }

  async function createCoin() {
    const errors = checkForm(coinForm)

    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'))
      return
    } else {
      coinStore.createCoin(coinForm);
    }
  }

  watch(coinForm, (newValue: Coin) => {
    coinForm.symbol = newValue.symbol.toUpperCase()
  })

</script>
