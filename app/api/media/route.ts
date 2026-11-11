import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = String(searchParams.get("file"));
    const decodeFile = decodeURIComponent(filename);

    const DATA_DIRECTORY = "/data";
    const filePath = path.resolve(DATA_DIRECTORY, decodeFile);
    if (!filePath.startsWith(DATA_DIRECTORY + path.sep)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const imageBuffer = await readFile(filePath);

    const uint8Array = new Uint8Array(imageBuffer);

    const ext = path.extname(decodeFile).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : ext === ".gif"
            ? "image/gif"
            : ext === ".webp"
              ? "image/webp"
              : ext === ".mp4"
                ? "video/mp4"
                : ext === ".webm"
                  ? "video/webm" 
                  : "application/octet-stream"

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
  }
}
