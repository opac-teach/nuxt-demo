import { memecoins } from "../data";

export default defineEventHandler(async (event) => {
  if (event.method === "OPTIONS") {
    return {
      message: "OK",
    };
  }

  if (event.method !== "DELETE") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  memecoins.splice(0);

  return "ok";
});
