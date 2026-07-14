"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/content";

const Ctx = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteContent(): SiteContent {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSiteContent must be used within SiteContentProvider");
  return c;
}
