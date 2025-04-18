import { memecoins } from "../data";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET" && event.method !== "OPTIONS") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  // Get authorization header
  const authHeader = getHeader(event, "Authorization");
  const cookieToken = getCookie(event, "auth_token");
  const headerToken = authHeader?.split(" ")[1];
  const token = cookieToken || headerToken;
  if (!token || (headerToken && !authHeader.startsWith("Bearer "))) {
    throw createError({
      statusCode: 401,
      message: "Missing or invalid authorization header",
    });
  }

  return memecoins;
});
