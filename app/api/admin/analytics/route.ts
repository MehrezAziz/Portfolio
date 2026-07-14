import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { readJSON } from "@/lib/store";
import type { Analytics, Message } from "@/lib/analytics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function topN(items: string[], n: number) {
  const counts: Record<string, number> = {};
  for (const it of items) {
    const key = it || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

function refLabel(ref: string) {
  if (!ref) return "Direct / none";
  try {
    return new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return ref.slice(0, 40);
  }
}

export async function GET() {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const a = await readJSON<Analytics>("analytics.json", { visits: [], downloads: [] });
  const messages = await readJSON<Message[]>("messages.json", []);

  const totalVisits = a.visits.length;
  const uniqueVisitors = new Set(a.visits.map((v) => v.ipHash)).size;

  // Views per day, last 14 days.
  const days: { day: string; count: number }[] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const start = d.getTime();
    const end = start + 86400000;
    const count = a.visits.filter((v) => v.t >= start && v.t < end).length;
    days.push({ day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count });
  }

  const downloadsByLang = {
    en: a.downloads.filter((d) => d.lang === "en").length,
    fr: a.downloads.filter((d) => d.lang === "fr").length,
  };

  const recentVisits = [...a.visits]
    .sort((x, y) => y.t - x.t)
    .slice(0, 40)
    .map((v) => ({ t: v.t, path: v.path, country: v.country, device: v.device, ref: refLabel(v.ref) }));

  return NextResponse.json({
    totalVisits,
    uniqueVisitors,
    totalDownloads: a.downloads.length,
    downloadsByLang,
    unreadMessages: messages.filter((m) => !m.read).length,
    totalMessages: messages.length,
    perDay: days,
    topPages: topN(a.visits.map((v) => v.path), 6),
    topReferrers: topN(a.visits.map((v) => refLabel(v.ref)), 6),
    topCountries: topN(a.visits.map((v) => v.country), 6),
    devices: topN(a.visits.map((v) => v.device), 3),
    recentVisits,
  });
}
