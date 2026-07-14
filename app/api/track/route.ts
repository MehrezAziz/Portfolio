import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readJSON, writeJSON } from "@/lib/store";
import type { Analytics } from "@/lib/analytics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function device(ua: string) {
  if (/mobile/i.test(ua) && !/ipad|tablet/i.test(ua)) return "Mobile";
  if (/ipad|tablet/i.test(ua)) return "Tablet";
  return "Desktop";
}

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") || "";
    // Skip obvious bots/crawlers.
    if (/bot|crawler|spider|crawl|slurp|bingpreview|facebookexternalhit/i.test(ua)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }
    const body = await req.json().catch(() => ({}));
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "0";
    const country = req.headers.get("cf-ipcountry") || "Unknown";
    const ipHash = crypto.createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 16);

    const a = await readJSON<Analytics>("analytics.json", { visits: [], downloads: [] });
    a.visits.push({
      t: Date.now(),
      path: String(body.path || "/").slice(0, 120),
      ref: String(body.ref || "").slice(0, 200),
      country,
      device: device(ua),
      ipHash,
    });
    if (a.visits.length > 5000) a.visits = a.visits.slice(-5000);
    await writeJSON("analytics.json", a);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
