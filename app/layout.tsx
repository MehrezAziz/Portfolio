import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azizmehrez.com"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.bio,
  keywords: [
    "Ahmed Aziz Mehrez",
    "Full-Stack Engineer",
    "React Native Developer",
    "DevOps",
    "Next.js",
    "NestJS",
    "AI Engineer",
    "Software Engineer Tunisia",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.bioShort,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.bioShort,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;var l=t? t==='light' : m;var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(l?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
