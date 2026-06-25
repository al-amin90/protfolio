import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";
import status from "http-status";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: status.BAD_REQUEST },
      );
    }

    // ✅ Convert File to Buffer directly - no filesystem write
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Upload directly to Cloudinary from memory
    const result = (await uploadToCloudinaryFromBuffer(
      buffer,
      image.name,
      "projects",
    )) as { secure_url: string; public_id: string };

    return NextResponse.json(
      { url: result.secure_url, raw: result },
      { status: status.OK },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Upload failed", error: (error as Error).message },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}

// ✅ New function to upload from buffer
async function uploadToCloudinaryFromBuffer(
  buffer: Buffer,
  filename: string,
  folder: string,
) {
  // Import cloudinary
  const cloudinary = await import("cloudinary").then((c) => c.v2);

  // Configure cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload from buffer
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: `${Date.now()}-${path.parse(filename).name}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    // Write buffer to stream
    uploadStream.end(buffer);
  });
}
