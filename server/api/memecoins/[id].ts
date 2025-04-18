import { memecoins } from "../../data";

export default defineEventHandler((event) => {
  const memecoinId = getRouterParam(event, "id");
  const memecoin = memecoins.filter((memecoin) => memecoin.id == memecoinId);
  if (memecoin.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Memecoin not found",
    });
  }
  return memecoin[0];
});
