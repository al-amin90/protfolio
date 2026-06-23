/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { signToken } from "@/modules/auth/auth.utils";
import status from "http-status";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  console.log("ADMIN_PASSWORD", ADMIN_PASSWORD);

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: status.FORBIDDEN },
    );
  }

  await dbConnect();

  const payload = { id: "admin", email, role: "admin" };
  const token = signToken(
    payload as any,
    process.env.JWT_ACCESS_TOKEN as string,
    "7d",
  );

  const res = NextResponse.json({ token }, { status: status.OK });
  res.cookies.set("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
