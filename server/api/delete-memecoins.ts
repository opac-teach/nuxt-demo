import { memecoins } from "../data";

export default defineEventHandler(async (event) => {
  if (event.method !== "DELETE" && event.method !== "OPTIONS") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  memecoins.splice(0);

  return "ok";
});
