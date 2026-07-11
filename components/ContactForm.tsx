"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

/**
 * Formspree endpoint.
 * 1. Create a free form at https://formspree.io (use your email: azizmehrez12@gmail.com).
 * 2. Copy the form ID (looks like "xyzabcd") from the endpoint URL.
 * 3. Set it below OR add NEXT_PUBLIC_FORMSPREE_ID to a .env.local file.
 */
const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID || "REPLACE_WITH_YOUR_FORM_ID";
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const configured = FORMSPREE_ID !== "REPLACE_WITH_YOUR_FORM_ID";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!configured) {
      setStatus("error");
      setError(
        "The form isn't connected yet. Add your Formspree ID to enable it — meanwhile, email me directly below."
      );
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => null);
        setError(json?.errors?.[0]?.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again or email me directly.");
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto mt-2 max-w-xl text-left">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-neon-cyan/30 bg-neon-cyan/5 p-8 text-center"
          >
            <CheckCircle2 size={44} className="text-neon-cyan" />
            <h3 className="text-xl font-bold text-fg">Message sent!</h3>
            <p className="text-sm text-fg-muted">
              Thanks for reaching out — I&apos;ll get back to you as soon as I can.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="cursor-interactive mt-2 text-sm font-medium text-neon-cyan hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-fg-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="cursor-interactive w-full rounded-xl border border-line bg-overlay px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-neon-cyan/60"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="cursor-interactive w-full rounded-xl border border-line bg-overlay px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-neon-cyan/60"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Hi Aziz, we have a role that might be a great fit..."
                className="cursor-interactive w-full resize-none rounded-xl border border-line bg-overlay px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-neon-cyan/60"
              />
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-interactive inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-3.5 font-semibold text-black transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
