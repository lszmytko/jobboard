import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export const auth = (token: string | undefined) => {
  if (!token) return false;

  try {
    const payload = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );
    return true;
  } catch (error) {
    console.log("tu przeeszlo", error);
    return false;
  }
};

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
