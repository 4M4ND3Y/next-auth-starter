import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_TOKEN!
    ) as DecodedToken;
    return decodedToken.id;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Token verification failed";
    throw new Error(errorMessage);
  }
};
