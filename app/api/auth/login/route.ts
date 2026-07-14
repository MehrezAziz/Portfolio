import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, issueToken, COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ok = await verifyCredentials(String(body.email || ""), String(body.password || ""));
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }
  const token = await issueToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
