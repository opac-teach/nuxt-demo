import { memecoins } from "../data";
import { corsHeaders } from "../cors";

export default defineEventHandler(async (event) => {
  setHeaders(event, corsHeaders);

  if (event.method !== "GET") {
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
