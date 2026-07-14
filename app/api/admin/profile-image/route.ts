import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { saveUpload, writeJSON, readJSON } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "Please upload an image file." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Image too large (max 8 MB)." }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  await saveUpload("profile-image", buf);
  const meta = await readJSON<Record<string, unknown>>("uploads.json", {});
  meta.profileImageMime = file.type;
  await writeJSON("uploads.json", meta);

  return NextResponse.json({ ok: true });
}
