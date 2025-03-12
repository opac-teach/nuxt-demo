export const useUser = (id: number) => {
  return useFetch(`/api/users/${id}`, {
    method: "GET",
  });
};

export const useUserIds = () => {
  return useFetch("/api/users", {
    method: "GET",
  });
};
