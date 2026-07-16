# Sunshine Beauty Therapy — Next.js site

A Next.js (App Router + TypeScript + Tailwind CSS) rebuild of the
[sunshinebeautytherapy.pplx.app](https://sunshinebeautytherapy.pplx.app/) design:
hero, about, treatments, skincare, testimonials, gift vouchers and footer, plus
a `/book` page that redirects to the live booking calendar.

## Getting started

Requires Node.js 18.18+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Notes / things to check before launch

- **Images** are referenced directly from the original hosts (BigCommerce,
  Contentful, the Juniper skincare site, etc.) via `next/image` — see
  `next.config.mjs` for the allowed remote hosts. For a production site you
  may want to download and self-host these instead, since they're outside
  your control.
- **Email address**: the source site obfuscates its email via Cloudflare
  email protection, so it couldn't be scraped. `src/lib/data.ts` has a
  placeholder (`info@sunshinebeautytherapy.com.au`) — update `SITE.email`
  with the real address.
- **Booking**: all "Book" buttons link to `/book`, which auto-redirects to
  `https://smartscheduling.com/janeguthrie` (the same external booking
  system the original site uses).
- Colors, type (Cormorant Garamond + Inter), and layout were recreated to
  match the source site's content and sage-green branding; this is a
  faithful re-implementation rather than a pixel-level CSS extraction.

## Project structure

```
src/
  app/
    layout.tsx        Root layout, fonts, metadata
    page.tsx           Homepage
    book/page.tsx       Booking redirect page
    globals.css
  components/           One component per homepage section
  lib/data.ts            Site content (treatments, testimonials, links, etc.)
```
