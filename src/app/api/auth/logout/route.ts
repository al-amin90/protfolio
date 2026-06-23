import { NextResponse } from "next/server";
import status from "http-status";

export async function POST() {
  const res = NextResponse.json(
    { message: "Logged out" },
    { status: status.OK },
  );
  res.cookies.set("accessToken", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
