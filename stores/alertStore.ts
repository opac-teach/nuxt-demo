import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const message = ref('')
  const type = ref<'success' | 'error'>('success')
  const visible = ref(false)

  function showAlert(msg: string, alertType: 'success' | 'error' = 'success') {
    message.value = msg
    type.value = alertType
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 1500)
  }

  return { message, type, visible, showAlert }
})
