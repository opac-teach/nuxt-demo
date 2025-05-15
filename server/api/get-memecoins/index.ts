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

  return memecoins;
});
