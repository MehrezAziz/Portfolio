import { promises as fs } from "fs";
import path from "path";

// Persistent data dir. In Docker this is a mounted volume (see docker-compose).
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

async function ensureDirs() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function readJSON<T>(name: string, fallback: T): Promise<T> {
  try {
    const buf = await fs.readFile(path.join(DATA_DIR, name), "utf8");
    return JSON.parse(buf) as T;
  } catch {
    return fallback;
  }
}

export async function writeJSON(name: string, data: unknown): Promise<void> {
  await ensureDirs();
  const target = path.join(DATA_DIR, name);
  const tmp = `${target}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, target);
}

export function uploadsPath(file: string) {
  return path.join(UPLOADS_DIR, file);
}

export async function saveUpload(file: string, buf: Buffer): Promise<void> {
  await ensureDirs();
  await fs.writeFile(uploadsPath(file), buf);
}

export async function readUpload(file: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(uploadsPath(file));
  } catch {
    return null;
  }
}

export { DATA_DIR };
