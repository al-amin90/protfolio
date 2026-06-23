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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
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

  const data = await req.json();
  const project = await Project.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(project, { status: status.OK });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const token = await getTokenFromReq(_req);
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

  await Project.findByIdAndDelete(params.id);
  return NextResponse.json(null, { status: status.NO_CONTENT });
}
