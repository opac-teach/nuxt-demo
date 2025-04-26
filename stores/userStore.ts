import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('');
  const age = ref<number | null>(null);
  const email = ref('');

  function setUsername(name: string) {
    username.value = name;
    localStorage.setItem('username', name);
  }

  function setAge(value: number) {
    age.value = value;
    localStorage.setItem('age', value.toString());
  }

  function setEmail(value: string) {
    email.value = value;
    localStorage.setItem('email', value);
  }

  function loadUserData() {
    username.value = localStorage.getItem('username') || '';
    age.value = Number(localStorage.getItem('age')) || 0;
    email.value = localStorage.getItem('email') || 'name@mail.com';
  }

  loadUserData();

  return {
    username,
    age,
    email,
    setUsername,
    setAge,
    setEmail,
    loadUserData
  };
})
