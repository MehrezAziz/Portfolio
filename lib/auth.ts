import crypto from "crypto";
import { cookies } from "next/headers";
import { readJSON, writeJSON } from "./store";

export const COOKIE_NAME = "aziz_admin";
const DEFAULT_EMAIL = "azizmehrez12@gmail.com";
const DEFAULT_PASSWORD = "00000000";
const WEEK = 1000 * 60 * 60 * 24 * 7;

type Settings = {
  email: string;
  salt: string;
  hash: string;
  secret: string;
};

function hashPw(pw: string, salt: string) {
  return crypto.scryptSync(pw, salt, 64).toString("hex");
}

function safeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function getSettings(): Promise<Settings> {
  let s = await readJSON<Settings | null>("settings.json", null);
  if (!s || !s.hash || !s.secret) {
    const salt = crypto.randomBytes(16).toString("hex");
    s = {
      email: DEFAULT_EMAIL,
      salt,
      hash: hashPw(DEFAULT_PASSWORD, salt),
      secret: crypto.randomBytes(32).toString("hex"),
    };
    await writeJSON("settings.json", s);
  }
  return s;
}

export async function getAdminEmail() {
  return (await getSettings()).email;
}

export async function verifyCredentials(email: string, password: string) {
  const s = await getSettings();
  if (String(email).trim().toLowerCase() !== s.email.toLowerCase()) return false;
  return safeEqualHex(hashPw(password, s.salt), s.hash);
}

export async function changePassword(current: string, next: string) {
  const s = await getSettings();
  if (!safeEqualHex(hashPw(current, s.salt), s.hash)) return false;
  const salt = crypto.randomBytes(16).toString("hex");
  await writeJSON("settings.json", { ...s, salt, hash: hashPw(next, salt) });
  return true;
}

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export async function issueToken(): Promise<string> {
  const s = await getSettings();
  const payload = `${s.email}|${Date.now() + WEEK}`;
  const sig = sign(payload, s.secret);
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export async function verifyToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const s = await getSettings();
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  const payload = Buffer.from(b64, "base64url").toString();
  if (!safeEqualHex(sig, sign(payload, s.secret))) return null;
  const [email, expStr] = payload.split("|");
  if (!expStr || Date.now() > Number(expStr)) return null;
  if (email.toLowerCase() !== s.email.toLowerCase()) return null;
  return email;
}

export async function requireAuth(): Promise<boolean> {
  const jar = await cookies();
  return (await verifyToken(jar.get(COOKIE_NAME)?.value)) !== null;
}
