import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { readJSON, readUpload } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const meta = await readJSON<{ profileImageMime?: string }>("uploads.json", {});
  const buf = await readUpload("profile-image");
  if (buf) {
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": meta.profileImageMime || "image/png",
        "Cache-Control": "no-store",
      },
    });
  }
  // Fallback to the bundled default photo.
  try {
    const def = await fs.readFile(path.join(process.cwd(), "public", "profile.png"));
    return new NextResponse(new Uint8Array(def), {
      headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
