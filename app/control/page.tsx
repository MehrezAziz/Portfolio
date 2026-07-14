"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  KeyRound,
  LogOut,
  Loader2,
  Lock,
  Trash2,
  Check,
  ExternalLink,
  Users,
  Download,
  MousePointerClick,
  Save,
  RotateCcw,
  Upload,
} from "lucide-react";
// (icons above are all used across the tabs)

type Me = { authed: boolean; email: string | null };
type Tab = "overview" | "messages" | "content" | "cvs" | "picture" | "password";

async function jget(url: string) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Request failed");
  return r.json();
}

/* ------------------------------------------------------------------ Login */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await r.json();
      if (r.ok && j.ok) onLogin();
      else setError(j.error || "Login failed.");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="glass w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 text-neon-cyan">
            <Lock size={22} />
          </span>
          <h1 className="text-xl font-bold text-fg">Control Panel</h1>
          <p className="mt-1 text-sm text-fg-subtle">Sign in to manage your portfolio</p>
        </div>

        <label className="mb-1.5 block text-sm text-fg-muted">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-line bg-overlay px-4 py-3 text-sm text-fg outline-none focus:border-neon-cyan/60"
          placeholder="you@example.com"
        />
        <label className="mb-1.5 block text-sm text-fg-muted">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-line bg-overlay px-4 py-3 text-sm text-fg outline-none focus:border-neon-cyan/60"
          placeholder="••••••••"
        />

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 font-semibold text-black disabled:opacity-70"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <KeyRound size={18} />}
          Sign in
        </button>
      </form>
    </div>
  );
}

/* --------------------------------------------------------------- Overview */
function Bar({ label, count, max }: { label: string; count: number; max: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-28 shrink-0 truncate text-fg-muted">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-overlay">
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
          style={{ width: `${max ? (count / max) * 100 : 0}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right font-mono text-xs text-fg">{count}</span>
    </div>
  );
}

function Overview() {
  const [d, setD] = useState<any>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    jget("/api/admin/analytics").then(setD).catch((e) => setErr(e.message));
  }, []);

  if (err) return <p className="text-sm text-red-300">{err}</p>;
  if (!d) return <Loader2 className="animate-spin text-neon-cyan" />;

  const maxDay = Math.max(1, ...d.perDay.map((x: any) => x.count));
  const cards = [
    { label: "Total visits", value: d.totalVisits, icon: MousePointerClick },
    { label: "Unique visitors", value: d.uniqueVisitors, icon: Users },
    { label: "CV downloads", value: d.totalDownloads, icon: Download },
    { label: "Messages", value: d.totalMessages, icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-5">
            <c.icon size={20} className="text-neon-cyan" />
            <div className="mt-3 text-3xl font-bold text-fg">{c.value}</div>
            <div className="mt-1 text-xs text-fg-subtle">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 text-sm font-semibold text-fg">Visits — last 14 days</h3>
        <div className="flex h-40 items-end gap-1.5">
          {d.perDay.map((x: any) => (
            <div key={x.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t bg-gradient-to-t from-neon-purple to-neon-cyan"
                style={{ height: `${(x.count / maxDay) * 100}%`, minHeight: x.count ? 3 : 0 }}
                title={`${x.count} visits`}
              />
              <span className="text-[9px] text-fg-subtle">{x.day.split(" ")[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Top pages", rows: d.topPages },
          { title: "Referrers", rows: d.topReferrers },
          { title: "Countries", rows: d.topCountries },
        ].map((sec) => {
          const m = Math.max(1, ...sec.rows.map((r: any) => r.count));
          return (
            <div key={sec.title} className="glass rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold text-fg">{sec.title}</h3>
              <div className="space-y-2">
                {sec.rows.length ? (
                  sec.rows.map((r: any) => <Bar key={r.label} label={r.label} count={r.count} max={m} />)
                ) : (
                  <p className="text-xs text-fg-subtle">No data yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="mb-1 text-sm font-semibold text-fg">Recent visitors</h3>
        <p className="mb-4 text-xs text-fg-subtle">
          Visitors are anonymous — names aren&apos;t available for website traffic. Country, device &amp; source shown instead.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-fg-subtle">
                <th className="py-2 pr-4 font-medium">When</th>
                <th className="py-2 pr-4 font-medium">Page</th>
                <th className="py-2 pr-4 font-medium">Country</th>
                <th className="py-2 pr-4 font-medium">Device</th>
                <th className="py-2 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {d.recentVisits.length ? (
                d.recentVisits.map((v: any, i: number) => (
                  <tr key={i} className="border-b border-line/50 text-fg-muted">
                    <td className="py-2 pr-4 whitespace-nowrap text-xs">{new Date(v.t).toLocaleString()}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{v.path}</td>
                    <td className="py-2 pr-4">{v.country}</td>
                    <td className="py-2 pr-4">{v.device}</td>
                    <td className="py-2 text-xs">{v.ref}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-fg-subtle">No visits recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Messages */
function MessagesTab() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    jget("/api/admin/messages").then((l) => setList(l)).finally(() => setLoading(false));
  }, []);
  useEffect(() => load(), [load]);

  const act = async (method: string, body: any) => {
    await fetch("/api/admin/messages", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  };

  if (loading) return <Loader2 className="animate-spin text-neon-cyan" />;
  if (!list.length) return <p className="text-sm text-fg-subtle">No messages yet.</p>;

  return (
    <div className="space-y-4">
      {list.map((m) => (
        <div
          key={m.id}
          className={`glass rounded-2xl p-5 ${!m.read ? "border-neon-cyan/40" : ""}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-fg">{m.name}</span>
                {!m.read && (
                  <span className="rounded-full bg-neon-cyan/15 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">
                    New
                  </span>
                )}
              </div>
              <a href={`mailto:${m.email}`} className="text-sm text-neon-cyan hover:underline">
                {m.email}
              </a>
            </div>
            <span className="text-xs text-fg-subtle">{new Date(m.t).toLocaleString()}</span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-fg-muted">{m.message}</p>
          <div className="mt-4 flex gap-2">
            <a
              href={`mailto:${m.email}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-overlay px-3 py-1.5 text-xs text-fg hover:text-neon-cyan"
            >
              <ExternalLink size={13} /> Reply
            </a>
            {!m.read && (
              <button
                onClick={() => act("PATCH", { id: m.id, read: true })}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-overlay px-3 py-1.5 text-xs text-fg hover:text-neon-cyan"
              >
                <Check size={13} /> Mark read
              </button>
            )}
            <button
              onClick={() => act("DELETE", { id: m.id })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Content */
const QUICK_FIELDS: { key: string; label: string; area?: boolean }[] = [
  { key: "name", label: "Full name" },
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
  { key: "availabilityText", label: "Availability status" },
  { key: "location", label: "Location" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "github", label: "GitHub URL" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "bio", label: "Bio (long)", area: true },
  { key: "bioShort", label: "Bio (short)", area: true },
];

function ContentTab() {
  const [content, setContent] = useState<any>(null);
  const [raw, setRaw] = useState("");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    jget("/api/admin/content").then((c) => {
      setContent(c);
      setRaw(JSON.stringify(c, null, 2));
    });
  }, []);
  useEffect(() => load(), [load]);

  const setField = (key: string, value: string) =>
    setContent((c: any) => ({ ...c, profile: { ...c.profile, [key]: value } }));

  const save = async (payload: any) => {
    setSaving(true);
    setMsg("");
    try {
      const r = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (r.ok && j.ok) {
        setMsg("Saved! Your live site is updated.");
        load();
      } else setMsg(j.error || "Save failed.");
    } catch {
      setMsg("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const saveRaw = () => {
    try {
      const parsed = JSON.parse(raw);
      save(parsed);
    } catch {
      setMsg("Invalid JSON — check your syntax.");
    }
  };

  const reset = async () => {
    if (!confirm("Reset ALL content back to the original defaults? This can't be undone.")) return;
    setSaving(true);
    await fetch("/api/admin/content", { method: "DELETE" });
    setSaving(false);
    setMsg("Reset to defaults.");
    load();
  };

  if (!content) return <Loader2 className="animate-spin text-neon-cyan" />;

  return (
    <div className="space-y-6">
      {msg && (
        <p className="rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 p-3 text-sm text-neon-cyan">{msg}</p>
      )}

      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 text-sm font-semibold text-fg">Profile &amp; hero</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {QUICK_FIELDS.map((f) => (
            <div key={f.key} className={f.area ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-xs text-fg-muted">{f.label}</label>
              {f.area ? (
                <textarea
                  rows={3}
                  value={content.profile[f.key] || ""}
                  onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full resize-none rounded-xl border border-line bg-overlay px-3 py-2.5 text-sm text-fg outline-none focus:border-neon-cyan/60"
                />
              ) : (
                <input
                  value={content.profile[f.key] || ""}
                  onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full rounded-xl border border-line bg-overlay px-3 py-2.5 text-sm text-fg outline-none focus:border-neon-cyan/60"
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => save(content)}
          disabled={saving}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2.5 text-sm font-semibold text-black disabled:opacity-70"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save changes
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-fg">Advanced — all sections (JSON)</h3>
        <p className="mb-3 mt-1 text-xs text-fg-subtle">
          Edit experience, projects, skills, achievements, stats, education &amp; languages here.
          Keep it valid JSON. Editing the fields above and saving will refresh this box.
        </p>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          spellCheck={false}
          rows={18}
          className="w-full rounded-xl border border-line bg-base-900/60 px-3 py-2.5 font-mono text-xs text-fg outline-none focus:border-neon-cyan/60"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={saveRaw}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2.5 text-sm font-semibold text-black disabled:opacity-70"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Apply &amp; save JSON
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm text-red-300 hover:bg-red-500/20"
          >
            <RotateCcw size={16} /> Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- CVs */
function UploadRow({
  title,
  hint,
  accept,
  onUpload,
  extra,
}: {
  title: string;
  hint: string;
  accept: string;
  onUpload: (file: File) => Promise<void>;
  extra?: React.ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
      <div>
        <p className="font-medium text-fg">{title}</p>
        <p className="text-xs text-fg-subtle">{hint}</p>
        {extra}
      </div>
      <div>
        <input
          ref={ref}
          type="file"
          accept={accept}
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            setDone(false);
            await onUpload(f);
            setBusy(false);
            setDone(true);
            if (ref.current) ref.current.value = "";
          }}
        />
        <button
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/5 px-5 py-2.5 text-sm font-medium text-neon-cyan disabled:opacity-70"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : done ? <Check size={16} /> : <Upload size={16} />}
          {busy ? "Uploading..." : done ? "Updated" : "Upload"}
        </button>
      </div>
    </div>
  );
}

function CvTab() {
  const [counts, setCounts] = useState<{ en: number; fr: number } | null>(null);
  useEffect(() => {
    jget("/api/admin/analytics").then((d) => setCounts(d.downloadsByLang)).catch(() => {});
  }, []);

  const upload = (lang: string) => async (file: File) => {
    const fd = new FormData();
    fd.append("lang", lang);
    fd.append("file", file);
    await fetch("/api/admin/cv", { method: "POST", body: fd });
  };

  return (
    <div className="space-y-4">
      <UploadRow
        title="English CV (PDF)"
        hint="Replaces the file served by the EN download button."
        accept="application/pdf"
        onUpload={upload("en")}
        extra={counts && <p className="mt-1 text-xs text-neon-cyan">{counts.en} downloads</p>}
      />
      <UploadRow
        title="French CV (PDF)"
        hint="Replaces the file served by the FR download button."
        accept="application/pdf"
        onUpload={upload("fr")}
        extra={counts && <p className="mt-1 text-xs text-neon-cyan">{counts.fr} downloads</p>}
      />
      <div className="flex gap-3">
        <a href="/api/cv?lang=en" className="text-sm text-neon-cyan hover:underline">Preview EN ↗</a>
        <a href="/api/cv?lang=fr" className="text-sm text-neon-cyan hover:underline">Preview FR ↗</a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Picture */
function PictureTab() {
  const [bust, setBust] = useState(Date.now());
  const upload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    await fetch("/api/admin/profile-image", { method: "POST", body: fd });
    setBust(Date.now());
  };
  return (
    <div className="space-y-4">
      <div className="glass flex flex-wrap items-center gap-6 rounded-2xl p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/profile-image?t=${bust}`}
          alt="Current profile"
          className="h-28 w-28 rounded-full border-2 border-white/20 object-cover"
        />
        <div>
          <p className="font-medium text-fg">Profile picture</p>
          <p className="text-xs text-fg-subtle">Shown on your /profile page. Square images look best.</p>
        </div>
      </div>
      <UploadRow
        title="Upload a new picture"
        hint="JPG or PNG, up to 8 MB."
        accept="image/*"
        onUpload={upload}
      />
    </div>
  );
}

/* --------------------------------------------------------------- Password */
function PasswordTab() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (next !== confirm) {
      setErr(true);
      setMsg("New passwords don't match.");
      return;
    }
    setBusy(true);
    const r = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current, next }),
    });
    const j = await r.json();
    setBusy(false);
    setErr(!j.ok);
    setMsg(j.ok ? "Password changed successfully." : j.error || "Failed.");
    if (j.ok) {
      setCurrent("");
      setNext("");
      setConfirm("");
    }
  };

  return (
    <form onSubmit={submit} className="glass max-w-md rounded-2xl p-6">
      <h3 className="mb-4 text-sm font-semibold text-fg">Change password</h3>
      {(["Current password", "New password", "Confirm new password"] as const).map((label, i) => (
        <div key={label} className="mb-4">
          <label className="mb-1.5 block text-xs text-fg-muted">{label}</label>
          <input
            type="password"
            value={[current, next, confirm][i]}
            onChange={(e) => [setCurrent, setNext, setConfirm][i](e.target.value)}
            required
            className="w-full rounded-xl border border-line bg-overlay px-3 py-2.5 text-sm text-fg outline-none focus:border-neon-cyan/60"
          />
        </div>
      ))}
      {msg && (
        <p className={`mb-4 rounded-lg p-2.5 text-sm ${err ? "border border-red-500/30 bg-red-500/10 text-red-300" : "border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan"}`}>
          {msg}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2.5 text-sm font-semibold text-black disabled:opacity-70"
      >
        {busy ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />} Update password
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------- Shell */
const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "content", label: "Content", icon: FileText },
  { id: "cvs", label: "CVs", icon: Download },
  { id: "picture", label: "Picture", icon: ImageIcon },
  { id: "password", label: "Password", icon: KeyRound },
];

export default function ControlPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  const refresh = useCallback(() => {
    jget("/api/auth/me").then(setMe).catch(() => setMe({ authed: false, email: null }));
  }, []);
  useEffect(() => refresh(), [refresh]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe({ authed: false, email: null });
  };

  if (!me) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-neon-cyan" />
      </div>
    );
  }
  if (!me.authed) return <LoginForm onLogin={refresh} />;

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-gradient animate-gradient-x font-mono text-lg font-bold">{"<AM/>"}</span>
            <span className="text-sm font-semibold text-fg">Control Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-fg-subtle sm:inline">{me.email}</span>
            <a href="/" target="_blank" className="text-xs text-neon-cyan hover:underline">View site ↗</a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-overlay px-3 py-1.5 text-xs text-fg hover:text-neon-cyan"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-gradient-to-r from-neon-cyan to-neon-purple text-black"
                  : "border border-line bg-overlay text-fg-muted hover:text-fg"
              }`}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <Overview />}
        {tab === "messages" && <MessagesTab />}
        {tab === "content" && <ContentTab />}
        {tab === "cvs" && <CvTab />}
        {tab === "picture" && <PictureTab />}
        {tab === "password" && <PasswordTab />}
      </div>
    </div>
  );
}
