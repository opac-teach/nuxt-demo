import { memecoins } from "../data";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../data";

export default defineEventHandler(async (event) => {
  // Get token from cookie
  const token = getCookie(event, "auth_token");
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Authentication required",
    });
  }
  
  try {
    // Verify JWT token
    jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
  
  const query = getQuery(event);
  const id = query.id as string;
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Memecoin ID is required",
    });
  }
  
  const memecoin = memecoins.find(coin => coin.id === id);
  
  if (!memecoin) {
    throw createError({
      statusCode: 404,
      message: "Memecoin not found",
    });
  }
  
  return memecoin;
});