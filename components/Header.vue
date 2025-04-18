<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth'

const router = useRouter()
const { isAuthenticated, logout } = useAuth()

const links = [
  {
    label: "Vue Demo",
    avatar: {
      src: "/favicon.ico",
    },
    badge: "SSR",
  },
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Routing",
    icon: "i-heroicons-share",
    to: "/routing",
  },
  {
    label: "State",
    icon: "i-heroicons-cog",
    to: "/state",
  },
  {
    label: "Data fetching",
    icon: "i-heroicons-user",
    to: "/users",
  },
  {
    label: "Memecoins",
    icon: "i-heroicons-user",
    to: "/exercices",
  },
  {
    label: "Form Memecoins",
    icon: "i-heroicons-user",
    to: "/formMemeCoin",
  },
  {
    label: "Authentification",
    icon: "i-heroicons-user",
    to: "/authentification",
    click: () => {
      if (isAuthenticated.value) {
        router.push('/formMemeCoin')
      } else {
        router.push('/authentification')
      }
    }
  },
  {
    label: "Se déconnecter",
    icon: "i-heroicons-arrow-left-on-rectangle",
    click: () => {
      if (isAuthenticated.value) {
        logout()
        router.push('/authentification')
      }
    },
    show: isAuthenticated,
  }
]
</script>

<template>
  <header>
    <UHorizontalNavigation
      :links="links.filter(link => link.show === undefined || link.show?.value)"
      class="border-b border-gray-200 dark:border-gray-800"
    />
  </header>
</template>
