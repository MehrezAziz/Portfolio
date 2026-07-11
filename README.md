# Ahmed Aziz Mehrez — Portfolio

An interactive personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

**Features:** particle-network background, custom animated cursor, light/dark mode, typewriter hero, animated stat counters, 3D tilt project cards with gradient banners, an experience timeline, a skills marquee, a working contact form, and a downloadable résumé.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & run production

```bash
npm run build
npm start
```

## Editing your content

All text lives in **`lib/data.ts`** — profile, availability status, experience,
projects, skills, achievements, and languages. Edit that one file to update the site.

- **Availability pill:** `profile.availabilityText` in `lib/data.ts`.
- **Résumé:** replace `public/Ahmed_Aziz_Mehrez_Resume.pdf` with an updated export.
- **Project screenshots:** drop an image in `public/projects/` and set the
  `image` field on that project (e.g. `image: "/projects/lsd.png"`) — it replaces
  the gradient banner automatically.

## Contact form (Formspree)

The contact form posts to [Formspree](https://formspree.io) (free tier).

1. Create a form at formspree.io and point it at `azizmehrez12@gmail.com`.
2. Copy the form ID from the endpoint URL `https://formspree.io/f/XXXX`.
3. Create `.env.local` (copy from `.env.local.example`) and set:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=XXXX
   ```
4. On Vercel, add the same env var under Project → Settings → Environment Variables.

Until it's set, the form shows a friendly notice and visitors can still use the
direct email/LinkedIn/GitHub links below it.

## Deploy (free) — Vercel

1. Push this repo to GitHub (already at `github.com/MehrezAziz/Portfolio`).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js — add the `NEXT_PUBLIC_FORMSPREE_ID` env var, then **Deploy**.
4. (Optional) Add a custom domain under Project → Settings → Domains.

## Tech

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS 3 · Framer Motion · lucide-react
