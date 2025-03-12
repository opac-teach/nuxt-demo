import { users } from "../../data";

export default defineEventHandler((event) => {
  return users.map((user) => user.id);
});
