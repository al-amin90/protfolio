import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";
import status from "http-status";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image");

  if (!image || !(image instanceof File)) {
    return NextResponse.json(
      { message: "No file provided" },
      { status: status.BAD_REQUEST },
    );
  }

  const uploadDir = path.join(process.cwd(), "tmp_uploads");
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${image.name}`;
  const filePath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await image.arrayBuffer());

  await fs.promises.writeFile(filePath, buffer);

  try {
    const result = await uploadToCloudinary(filePath, "projects");
    await fs.promises.unlink(filePath);
    return NextResponse.json(
      { url: result.secure_url, raw: result },
      { status: status.OK },
    );
  } catch (error) {
    await fs.promises.unlink(filePath).catch(() => {});
    return NextResponse.json(
      { message: "Upload failed", error },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}
