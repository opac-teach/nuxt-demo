export const useUsersStore = defineStore("users", {
  state: () => ({
    userIds: [] as number[],
    users: {} as Record<number, any>,
  }),
  getters: {
    user: (state) => (id: number | string) => state.users[Number(id)],
  },

  actions: {
    // Missing state/error management here
    async fetchUserIds() {
      this.userIds = await $fetch("/api/users");
    },
    async fetchUser(id: number) {
      this.users[id] = await $fetch(`/api/users/${id}`);
    },
  },
});
