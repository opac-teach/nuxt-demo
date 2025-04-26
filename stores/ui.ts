import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isDarkMode = ref(false)

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', isDarkMode.value.toString())
  }

  function getDarkMode() {
    const storedPreference = localStorage.getItem('darkMode')
    if (storedPreference !== null) {
      isDarkMode.value = storedPreference === 'true'
    } else {
      // Use system preference as default
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  getDarkMode()

  return {
    isDarkMode,
    toggleDarkMode,
  }
})
