import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readJSON, writeJSON } from "@/lib/store";
import type { Message } from "@/lib/analytics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 160 || message.length > 4000) {
      return NextResponse.json({ ok: false, error: "One of the fields is too long." }, { status: 400 });
    }

    const list = await readJSON<Message[]>("messages.json", []);
    list.push({
      id: crypto.randomUUID(),
      name: name.slice(0, 120),
      email: email.slice(0, 160),
      message: message.slice(0, 4000),
      t: Date.now(),
      read: false,
    });
    if (list.length > 2000) list.splice(0, list.length - 2000);
    await writeJSON("messages.json", list);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
