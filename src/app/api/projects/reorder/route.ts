import { NextRequest, NextResponse } from "next/server";
import status from "http-status";
import dbConnect from "@/lib/db/mongodb";
import Project from "@/modules/project/project.model";
import { verifyToken } from "@/modules/auth/auth.utils";

async function getTokenFromReq(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cookie = req.cookies.get("accessToken")?.value;
  return authHeader?.split(" ")[1] || cookie;
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const token = await getTokenFromReq(req);
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: status.UNAUTHORIZED },
    );
  }

  try {
    verifyToken(token, process.env.JWT_ACCESS_TOKEN as string);
  } catch (err) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: status.UNAUTHORIZED },
    );
  }

  const { order } = await req.json();
  if (!Array.isArray(order)) {
    return NextResponse.json(
      { message: "Invalid payload" },
      { status: status.BAD_REQUEST },
    );
  }

  for (let i = 0; i < order.length; i++) {
    await Project.findByIdAndUpdate(order[i], { order: i });
  }

  return NextResponse.json({ message: "Reordered" }, { status: status.OK });
}
