import { NextRequest, NextResponse } from "next/server";
import { requireAuth, changePassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const current = String(body.current || "");
  const next = String(body.next || "");
  if (next.length < 6) {
    return NextResponse.json({ ok: false, error: "New password must be at least 6 characters." }, { status: 400 });
  }
  const ok = await changePassword(current, next);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Current password is incorrect." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
