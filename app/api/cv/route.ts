import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { readJSON, writeJSON, readUpload } from "@/lib/store";
import type { Analytics } from "@/lib/analytics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") === "fr" ? "fr" : "en";

  // Log the download (best-effort).
  try {
    const ua = req.headers.get("user-agent") || "";
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "0";
    const ipHash = crypto.createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 16);
    const a = await readJSON<Analytics>("analytics.json", { visits: [], downloads: [] });
    a.downloads.push({ t: Date.now(), lang, ipHash });
    if (a.downloads.length > 5000) a.downloads = a.downloads.slice(-5000);
    await writeJSON("analytics.json", a);
  } catch {
    /* ignore logging errors */
  }

  // Serve uploaded override, else the bundled default.
  let buf = await readUpload(`cv_${lang}.pdf`);
  if (!buf) {
    const def = lang === "fr" ? "Ahmed_Aziz_Mehrez_Resume_FR.pdf" : "Ahmed_Aziz_Mehrez_Resume_EN.pdf";
    try {
      buf = await fs.readFile(path.join(process.cwd(), "public", def));
    } catch {
      return new NextResponse("CV not found", { status: 404 });
    }
  }

  const filename = `Ahmed_Aziz_Mehrez_Resume_${lang.toUpperCase()}.pdf`;
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
