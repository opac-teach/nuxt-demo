import { corsHeaders } from "../cors";
import { memecoins, users, Memecoin, gr } from "../data";

export default defineEventHandler(async (event) => {
  // setHeaders(event, corsHeaders);
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
    id: gr(),
    name: body.name,
    symbol: body.symbol,
    owner: users[0].id,
    description: body.description || null,
    logoUrl: body.logoUrl || null,
  };

  // Add to the "database" (please never do that in a real app)
  memecoins.push(memecoin);

  // Return the validated data
  return {
    message: "Memecoin created successfully",
    memecoin,
  };
});
