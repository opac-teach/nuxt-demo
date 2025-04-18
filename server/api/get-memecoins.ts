import { memecoins } from "../data";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET" && event.method !== "OPTIONS") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  if (false) {
    throw createError({
      statusCode: 500,
      message: "Random server error",
    });
  }

  return memecoins;
});
