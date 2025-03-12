export const useLocalCounter = () => {
  const count = ref(0);

  return {
    count,
    increment: () => count.value++,
    decrement: () => count.value--,
  };
};
