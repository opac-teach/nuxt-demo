<template>
  <div class="max-w-md mx-auto mt-20 text-center">
    <h1 class="text-2xl font-bold mb-6">Authentification</h1>

    <div v-if="authStore.isAuthenticated">
      <p class="mb-4">Vous êtes connecté !</p>
      <button @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded">Se déconnecter</button>
    </div>

    <form v-else @submit.prevent="handleLogin" class="flex flex-col gap-3 text-left">
      <div>
        <input v-model="username" placeholder="Nom d'utilisateur" class="input w-full" />
        <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</p>
      </div>

      <div>
        <input v-model="age" type="number" placeholder="Âge" class="input w-full" />
        <p v-if="errors.age" class="text-red-500 text-sm">{{ errors.age }}</p>
      </div>

      <div>
        <input v-model="email" placeholder="Mail" class="input w-full" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <div>
        <input v-model="password" type="password" placeholder="Mot de passe" class="input w-full" />
        <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
      </div>

      <button :disabled="!isFormValid" class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        Se connecter
      </button>

      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores/alertStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue';

const username = ref('');
const age = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const errors = ref<{ [key: string]: string }>({});
const router = useRouter();

const authStore = useAuthStore();
const alertStore = useAlertStore();
const userStore = useUserStore();

watch(username, (val) => {
  errors.value.username = val.trim().length < 3 ? 'Le nom d\'utilisateur est trop court.' : '';
});

watch(age, (val) => {
  const num = Number(val);
  if (!val || isNaN(num)) {
    errors.value.age = 'L’âge doit être un nombre.';
  } else if (num < 18 || num > 100) {
    errors.value.age = 'L’âge doit être entre 18 et 100.';
  } else {
    errors.value.age = '';
  }
});

watch(email, (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errors.value.email = !emailRegex.test(val) ? 'Email invalide (ex: nom@domaine.com)' : '';
});

watch(password, (val) => {
  errors.value.password = val.length < 6 ? 'Mot de passe trop court.' : '';
});

const isFormValid = computed(() => {
  return (
      username.value.trim().length >= 3 &&
      Number(age.value) >= 18 && Number(age.value) <= 100 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
      password.value.length >= 6 &&
      !Object.values(errors.value).some((err) => err)
  );
});

const handleLogin = async () => {
  if (!isFormValid.value) return;

  try {
    const res = await fetch("https://nuxt-demo-blush.vercel.app/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: password.value })
    });

    const data = await res.json();

    if (res.ok && data.token && data.userId) {
      authStore.login(data.token, data.userId);

      userStore.setUsername(username.value);
      userStore.setAge(Number(age.value));
      userStore.setEmail(email.value);

      alertStore.showAlert("Connexion réussie !", "success");
      error.value = "";
      await router.push('/');
    } else {
      error.value = typeof data.error === "string" ? data.error : "Mot de passe incorrect !";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error.value = "Erreur réseau";
  }
};

const handleLogout = () => {
  authStore.logout();
  userStore.setUsername('');
  userStore.setAge(0);
  userStore.setEmail('name@mail.com');
  alertStore.showAlert("Déconnecté avec succès.", "error");
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/');
  }
});
</script>
