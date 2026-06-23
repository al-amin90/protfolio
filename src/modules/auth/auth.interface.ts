import { NextRequest } from "next/server";

export type TUserRole = "admin" | "user";

export interface IUserPayload {
  id: string;
  email: string;
  role: TUserRole;
  iat?: number;
  exp?: number;
}

export interface IAuthRequest extends NextRequest {
  user?: IUserPayload;
}

export type Handler = (
  req: NextRequest | IAuthRequest,
  ctx?: any,
) => Promise<any>;
