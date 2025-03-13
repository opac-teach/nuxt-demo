import { memecoins, Memecoin } from "../data";
import jwt, { JwtPayload } from "jsonwebtoken";

import { SECRET_KEY } from "../data";

export default defineEventHandler(async (event) => {
  // Ensure it's a POST request
  if (event.method !== "POST") {
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

  let userId: string;
  try {
    // Verify JWT token using same secret key as login endpoint
    const payload = jwt.verify(token, SECRET_KEY) as JwtPayload;
    if (!payload.authenticated) {
      throw null;
    }
    userId = payload.userId;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }

  // Get the request body
  const body = await readBody(event);

  // Validate required fields and their constraints
  if (
    !body.name ||
    typeof body.name !== "string" ||
    body.name.length < 4 ||
    body.name.length > 16
  ) {
    throw createError({
      statusCode: 400,
      message: "Name must be between 4 and 16 characters",
    });
  }

  if (
    !body.symbol ||
    typeof body.symbol !== "string" ||
    body.symbol.length < 2 ||
    body.symbol.length > 4 ||
    body.symbol.toUpperCase() !== body.symbol
  ) {
    throw createError({
      statusCode: 400,
      message: "Symbol must be between 2 and 4 characters and uppercase",
    });
  }

  // Validate optional fields if they are present
  if (
    body.description &&
    (typeof body.description !== "string" || body.description.length > 1000)
  ) {
    throw createError({
      statusCode: 400,
      message: "Description must not exceed 1000 characters",
    });
  }

  const httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (
    body.logoUrl &&
    (typeof body.logoUrl !== "string" ||
      body.logoUrl.length > 200 ||
      !httpRegex.test(body.logoUrl))
  ) {
    throw createError({
      statusCode: 400,
      message: "Logo URL must not exceed 200 characters and be a valid URL",
    });
  }

  const memecoin: Memecoin = {
    id: Math.random().toString(36).substring(2, 15),
    name: body.name,
    symbol: body.symbol,
    description: body.description || null,
    logoUrl: body.logoUrl || null,
    owner: userId,
  };

  // Add to the "database" (please never do that in a real app)
  memecoins.push(memecoin);

  // Return the validated data
  return {
    message: "Memecoin created successfully",
    memecoin,
  };
});
