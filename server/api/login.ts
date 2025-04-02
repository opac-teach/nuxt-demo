import jwt from "jsonwebtoken";

import { CORRECT_PASSWORD, gr, SECRET_KEY } from "../data";

export default defineEventHandler(async (event) => {
  try {
    if (event.method === "OPTIONS") {
      return {
        message: "OK",
      };
    }

    if (event.method !== "POST") {
      throw createError({
        statusCode: 405,
        message: "Method not allowed",
      });
    }

    const body = await readBody(event);
    const { password } = body;

    if (!password) {
      throw createError({
        statusCode: 400,
        message: "Password is required",
      });
    }

    if (password !== CORRECT_PASSWORD) {
      throw createError({
        statusCode: 401,
        message: "Invalid password",
      });
    }

    const userId = gr();
    // Generate JWT token
    const token = jwt.sign(
      {
        authenticated: true,
        iat: Math.floor(Date.now() / 1000),
        userId,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      token,
      message: "Login successful",
      userId,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
