export const useUser = (id: string) => {
  return useFetch(`/api/users/${id}`, {
    method: "GET",
  });
};

export const useUserIds = () => {
  return useFetch("/api/users", {
    method: "GET",
  });
};
