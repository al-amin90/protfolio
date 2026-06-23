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

  if (!order || !Array.isArray(order)) {
    return NextResponse.json(
      { message: "Invalid order data" },
      { status: status.BAD_REQUEST },
    );
  }

  // Update order for each project
  await Promise.all(
    order.map((id: string, index: number) =>
      Project.findByIdAndUpdate(id, { order: index + 1 }),
    ),
  );

  return NextResponse.json(
    { message: "Order updated successfully" },
    { status: status.OK },
  );
}
