<template>
  <div
      class="relative group"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
  >
    <div class="flex items-center mr-5 cursor-pointer border border-transparent hover:border-gray-400 rounded-md p-2 transition-colors duration-200">
      <img
          :src="uiStore.isDarkMode ? profileLight : profileDark"
          alt="Profile logo"
          class="w-8 h-8 mx-2"
      />

      <p class="text-sm mx-2" :class="authStore.isAuthenticated ? 'font-medium' : 'text-gray-500'">
        {{ authStore.isAuthenticated ? userStore.username : 'None' }}
      </p>
    </div>

    <div
        v-if="isOpen"
        class="absolute top-full right-5 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50"
    >
      <ul class="text-sm text-gray-700 dark:text-gray-200">
        <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" @click="goToProfileDetail">
          Profil
        </li>
        <li
            v-if="!authStore.isAuthenticated"
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            @click="goToAuthForm"
        >
          Connexion
        </li>
        <li v-if="authStore.isAuthenticated" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" @click="handleLogout">
          Déconnexion
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { useUIStore } from '@/stores/ui';
import profileLight from '@/assets/profile-light-logo.png';
import profileDark from '@/assets/profile-dark-logo.png';

const authStore = useAuthStore();
const userStore = useUserStore();
const uiStore = useUIStore();
const isOpen = ref(false);
const router = useRouter();

const goToAuthForm = () => router.push('/auth-form')
const goToProfileDetail = () => router.push('/profile-detail')
const handleLogout = () => {
  authStore.logout()
  userStore.setUsername('')
  userStore.setAge(0)
  userStore.setEmail('')
}

</script>
