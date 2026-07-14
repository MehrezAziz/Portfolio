import "server-only";
import * as d from "./data";
import { readJSON, writeJSON } from "./store";

export type SiteContent = {
  profile: typeof d.profile;
  stats: typeof d.stats;
  experiences: typeof d.experiences;
  projects: typeof d.projects;
  skillGroups: typeof d.skillGroups;
  marqueeSkills: typeof d.marqueeSkills;
  achievements: typeof d.achievements;
  leadership: typeof d.leadership;
  education: typeof d.education;
  languages: typeof d.languages;
};

export const defaultContent: SiteContent = {
  profile: d.profile,
  stats: d.stats,
  experiences: d.experiences,
  projects: d.projects,
  skillGroups: d.skillGroups,
  marqueeSkills: d.marqueeSkills,
  achievements: d.achievements,
  leadership: d.leadership,
  education: d.education,
  languages: d.languages,
};

/** True when the override value is shape-compatible with the default. */
export function shapeMatches(def: unknown, val: unknown): boolean {
  if (val === undefined || val === null) return false;
  if (Array.isArray(def) !== Array.isArray(val)) return false;
  return typeof def === typeof val;
}

/**
 * Merged content: JSON overrides from the store on top of the code defaults.
 * Any override key whose shape doesn't match the default is ignored, so the
 * live site can never be broken by a malformed edit.
 */
export async function getContent(): Promise<SiteContent> {
  const override = await readJSON<Record<string, unknown> | null>("content.json", null);
  if (!override || typeof override !== "object") return defaultContent;
  const merged: Record<string, unknown> = { ...defaultContent };
  for (const k of Object.keys(defaultContent) as (keyof SiteContent)[]) {
    if (shapeMatches(defaultContent[k], override[k])) merged[k] = override[k];
  }
  return merged as SiteContent;
}

export async function saveContent(next: SiteContent): Promise<void> {
  await writeJSON("content.json", next);
}
