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

## Control panel (`/control`)

A private admin dashboard lets you manage everything at runtime — **no redeploy needed**:

- **URL:** `https://yourdomain.com/control`
- **Default login:** `azizmehrez12@gmail.com` / `00000000` — **change the password**
  immediately from the Password tab.
- **Content:** edit profile/hero fields inline, or every section (experience,
  projects, skills, …) via the advanced JSON editor. Saves reflect on the live site instantly.
- **CVs:** upload new English / French PDFs, and see download counts.
- **Picture:** upload a new profile photo.
- **Messages:** read/reply/delete messages sent through the contact form.
- **Overview:** visits, unique visitors, per-day trend, top pages/referrers/countries,
  device breakdown, and CV downloads. (Website visitors are anonymous — real names
  aren't available for web traffic; country/device/source are shown instead.)

All of this is stored in a JSON data store under `DATA_DIR` (a persistent Docker
volume in production — see `DEPLOY.md`). The code defaults live in `lib/data.ts`;
the control panel overrides them.

## Contact form

Messages submitted through the site are stored in the data store and appear in
the control panel's **Messages** tab (`POST /api/contact`). No third-party service required.

## Deploy

Self-hosted on a VPS with Docker + Nginx — see **`DEPLOY.md`** (includes the
Cloudflare + HTTPS setup for `azizmehrez.com`). The `portfolio_data` Docker
volume persists all control-panel data across redeploys.

## Tech

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS 3 · Framer Motion · lucide-react
