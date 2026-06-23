import jwt from "jsonwebtoken";
import { IUserPayload } from "./auth.interface";

export function signToken(
  payload: IUserPayload,
  secret: string,
  expiresIn = "7d",
) {
  return jwt.sign(payload as any, secret, { expiresIn });
}

export function verifyToken(token: string, secret: string): IUserPayload {
  const decoded = jwt.verify(token, secret) as IUserPayload;
  return decoded;
}
