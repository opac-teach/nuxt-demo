import { corsHeaders } from "../cors";
import { memecoins } from "../data";

export default defineEventHandler(async (event) => {
  setHeaders(event, corsHeaders);
  if (event.method !== "DELETE") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  memecoins.splice(0);

  return "ok";
});
