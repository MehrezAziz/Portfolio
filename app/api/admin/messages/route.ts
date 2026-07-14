import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/store";
import type { Message } from "@/lib/analytics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await readJSON<Message[]>("messages.json", []);
  return NextResponse.json(list.sort((a, b) => b.t - a.t));
}

// Mark read/unread: { id, read }
export async function PATCH(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, read } = await req.json().catch(() => ({}));
  const list = await readJSON<Message[]>("messages.json", []);
  const m = list.find((x) => x.id === id);
  if (m) m.read = Boolean(read);
  await writeJSON("messages.json", list);
  return NextResponse.json({ ok: true });
}

// Delete: { id }
export async function DELETE(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  const list = await readJSON<Message[]>("messages.json", []);
  await writeJSON("messages.json", list.filter((x) => x.id !== id));
  return NextResponse.json({ ok: true });
}
