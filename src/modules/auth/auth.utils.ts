/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserPayload } from "./auth.interface";

export function signToken(
  payload: IUserPayload,
  secret: string,
  expiresIn = "7d",
) {
  // ✅ Check if secret exists
  if (!secret) {
    throw new Error("JWT secret is required");
  }

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string, secret: string): IUserPayload {
  const decoded = jwt.verify(token, secret) as IUserPayload;
  return decoded;
}
