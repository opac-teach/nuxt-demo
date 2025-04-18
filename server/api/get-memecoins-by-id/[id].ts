import { memecoins } from "../../data";

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

  const coinId = getRouterParam(event, "id");

  const coin = memecoins.find((coin) => coin.id === coinId);

  if (!coin) {
    throw createError({
      statusCode: 404,
      message: "Memecoin not found",
    });
  }

  return coin;
});
