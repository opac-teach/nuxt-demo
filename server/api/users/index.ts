import { users } from "../../data";
import { corsHeaders } from "../../cors";

export default defineEventHandler((event) => {
  setHeaders(event, corsHeaders);
  return users.map((user) => user.id);
});
