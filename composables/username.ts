export const useUsername = () => {
  const username = ref("unknown");

  // import .meta .client
  if (import.meta.client) {
    onMounted(() => {
      const stored = localStorage.getItem("username");
      if (stored) {
        username.value = stored;
      }
      watch(username, (value) => {
        localStorage.setItem("username", value);
      });
    });
  }

  return username;
};
