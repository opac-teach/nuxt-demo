<template>
<!--  <p>{{ userStore.loggedIn }}</p>-->
  <form v-if="!userStore.loggedIn" @submit.prevent="login" class="flex flex-row h-[20px]">
    <label for="password" class="mt-2"></label>
    <input
      type="text"
      id="password"
      v-model="loginForm.password"
      required
      placeholder="Password"
    >
    <button class="btn mt-3.5" type="submit">Login</button>
  </form>

  <form v-else @submit.prevent="logout" class="flex flex-col">
    <button class="btn mt-3.5" type="submit">Logout</button>
  </form>
</template>


<script setup lang="ts">
import { useUser } from '@/stores/user.ts';
import { reactive } from 'vue'

const userStore = useUser()

interface User {
  password: string
}

const loginForm = reactive<User>( {
  password: null,
})

function login() {
  userStore.login(loginForm)
}

function logout() {
  userStore.logout()
}
</script>

