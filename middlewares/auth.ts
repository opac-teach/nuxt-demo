export default defineNuxtRouteMiddleware(() => {
    const token = useCookie('auth_token')
    console.log(token);
    
  
    if (!token.value) {
      return navigateTo('/login')
    }
  })