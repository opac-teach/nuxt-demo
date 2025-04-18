export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUser();
    
    // If user is authenticated and trying to access login page
    if (userStore.loggedIn) {
      return navigateTo('/exercices');
    }
  })