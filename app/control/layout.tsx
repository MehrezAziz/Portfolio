import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control Panel",
  robots: { index: false, follow: false },
};

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return children;
}
