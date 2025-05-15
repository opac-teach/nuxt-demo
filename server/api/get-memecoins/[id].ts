import { memecoins } from "~/server/data";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET" && event.method !== "OPTIONS") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  if (Math.random() < 0.2) {
    throw createError({
      statusCode: 500,
      message: "Random server error",
    });
  }

  const id = event.context.params?.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Missing id",
    });
  }

  const memecoin = memecoins.find((memecoin) => memecoin.id === id);
  if (!memecoin) {
    throw createError({
      statusCode: 404,
      message: "Memecoin not found",
    });
  }

  return memecoin;
});
