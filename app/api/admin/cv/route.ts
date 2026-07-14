import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { saveUpload } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const lang = form.get("lang") === "fr" ? "fr" : "en";
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ ok: false, error: "Please upload a PDF file." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "File too large (max 10 MB)." }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  await saveUpload(`cv_${lang}.pdf`, buf);
  return NextResponse.json({ ok: true, lang });
}
