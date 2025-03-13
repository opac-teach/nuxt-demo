export const useUsersStore = defineStore("users", {
  state: () => ({
    userIds: [] as string[],
    users: {} as Record<string, any>,
  }),
  getters: {
    user: (state) => (id: string) => state.users[id],
  },

  actions: {
    // Missing state/error management here
    async fetchUserIds() {
      this.userIds = await $fetch("/api/users");
    },
    async fetchUser(id: string) {
      this.users[id] = await $fetch(`/api/users/${id}`);
    },
  },
});
