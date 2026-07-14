import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getContent, saveContent, defaultContent, shapeMatches, type SiteContent } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEYS = Object.keys(defaultContent) as (keyof SiteContent)[];

export async function GET() {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getContent());
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }
  // Validate each provided key's shape so a bad edit can't break the site.
  const bad: string[] = [];
  const next = { ...defaultContent } as Record<string, unknown>;
  for (const k of KEYS) {
    const v = (body as Record<string, unknown>)[k];
    if (v === undefined) continue;
    if (shapeMatches(defaultContent[k], v)) next[k] = v;
    else bad.push(k);
  }
  if (bad.length) {
    return NextResponse.json(
      { ok: false, error: `These sections have the wrong type (array vs object mismatch): ${bad.join(", ")}` },
      { status: 400 }
    );
  }
  await saveContent(next as SiteContent);
  return NextResponse.json({ ok: true });
}

// Reset content back to the code defaults.
export async function DELETE() {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await saveContent(defaultContent);
  return NextResponse.json({ ok: true });
}
