import { NextResponse } from "next/server";
import { requireAuth, getAdminEmail } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await requireAuth();
  return NextResponse.json({
    authed,
    email: authed ? await getAdminEmail() : null,
  });
}
