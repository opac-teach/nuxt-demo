export const useUser = (id: number) => {
  return useFetch(`/api/users/${id}`, {
    method: "GET",
    key: `user-${id}`,
  });
};

export const useUserIds = () => {
  return useFetch("/api/users", {
    method: "GET",
    key: "users",
  });
};
