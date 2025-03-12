import { users } from "../../data";

export default defineEventHandler((event) => {
  const userId = Number(getRouterParam(event, "id"));
  const user = users.filter((user) => user.id == userId);
  if (user.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }
  return user[0];
});
