export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUser();
    
    // If user is not authenticated and trying to access a protected route
    if (!userStore.loggedIn) {
      return navigateTo('/login');
    }
  })