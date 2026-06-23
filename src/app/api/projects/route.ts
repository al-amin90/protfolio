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

export async function GET() {
  await dbConnect();
  const projects = await Project.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(projects, { status: status.OK });
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

  const {
    title,
    description,
    image,
    tags = [],
    liveLink,
    sourceLink,
    order = 0,
  } = await req.json();
  const project = await Project.create({
    title,
    description,
    image,
    tags,
    liveLink,
    sourceLink,
    order,
  });
  return NextResponse.json(project, { status: status.CREATED });
}
