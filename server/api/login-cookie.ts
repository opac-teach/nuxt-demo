import jwt from "jsonwebtoken";

import { CORRECT_PASSWORD, gr, SECRET_KEY } from "../data";
import { corsHeaders } from "../cors";

export default defineEventHandler(async (event) => {
  setHeaders(event, corsHeaders);
  try {
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

    // Set JWT token as HTTP-only cookie
    setCookie(event, "auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });

    return {
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
