import { users } from "../../data";
import { corsHeaders } from "../../cors";

export default defineEventHandler((event) => {
  setHeaders(event, corsHeaders);
  const userId = getRouterParam(event, "id");
  const user = users.filter((user) => user.id == userId);
  if (user.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }
  return user[0];
});
