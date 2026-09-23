# alexvcasillas.com redesign — design spec

Date: 2026-09-23
Status: approved design, pending spec review
Visual design: https://claude.ai/artifact/Upv3cF6ixreYYE5dUS4q6H

## 1. Goal

Replace the current Next.js 13 site with a fresh static site that does three things:

1. Showcases the four free iOS apps (Mellow Sudoku, Pebble Paths, Little Lanterns, Pocket Orbit).
2. Showcases a curated set of open-source GitHub projects with live star counts.
3. Hosts a blog written as plain markdown files.

Nothing from the old site carries over: no old articles, no legacy products, no book mention. The repo is rebuilt from scratch on the `main` branch (old source removed in the first implementation step).

## 2. Non-goals

- No CMS, no database, no server runtime.
- No client-side framework. Client JavaScript is limited to a theme toggle and nothing else.
- No comments, newsletter, search, or analytics in this iteration. Analytics can be added later as a script tag.
- No contact email on the site (spam). Contact routes are GitHub, App Store, LinkedIn, RSS.

## 3. Stack

- **Astro** (latest stable), static output (`output: 'static'`).
- **Content collections** for blog posts (`src/content/posts/*.md`) with typed frontmatter.
- **Data files** for apps (`src/data/apps.json`) and curated repos (`src/data/repos.json`).
- **Shiki** (Astro's built-in) for build-time syntax highlighting with a custom theme using site colors.
- **@astrojs/rss** for the feed, **@astrojs/sitemap** for the sitemap.
- Plain CSS with custom properties. No Tailwind. Fonts self-hosted via the `@fontsource-variable` packages (bundled woff2, two above-the-fold files preloaded) rather than loaded from Google, so the site works offline and has no third-party requests.
- Package manager: pnpm (matches the existing lockfile convention).
- Hosting: any static host. The site builds to `dist/` with `build.format: 'file'` (`about.html`, no trailing slashes); canonical URLs are normalized to the extensionless form. Deployment config is out of scope for this spec beyond producing a static build.

## 4. Site map

| Route | Page | Source |
|---|---|---|
| `/` | Home | hero, apps bands, open source list, latest 3 posts, footer |
| `/apps` | Apps | all four bands, same component as home, plus a short intro |
| `/open-source` | Open source | full curated repo list |
| `/writing` | Writing index | all posts, newest first, optional tag filter by URL (`/writing/tag/node`) |
| `/writing/[slug]` | Post | rendered markdown |
| `/about` | About | headline, four-paragraph bio, portrait, "Right now" list, "Elsewhere" links |
| `/rss.xml` | RSS feed | all posts |
| `/sitemap-index.xml` | Sitemap | generated |
| `/404` | Not found | one line and a link home |

Navigation on every page: Apps, Open source, Writing, About. Site name links home.

## 5. Visual design

The approved canvas is the source of truth for layout and spacing. Summary:

**Concept: paper to night.** Light mode opens on warm paper. The four app bands step through the apps' own grounds in order (paper, stone, evening teal, deep night). Open source, writing, and footer stay on the night ground. Dark mode starts on the evening ground; app bands keep their own colors in both modes.

**Palette (CSS custom properties)**

| Token | Light | Dark |
|---|---|---|
| `--paper` (page ground) | `#F6F2E8` | `#0C1B24` |
| `--ink` (text) | `#1F2A26` | `#F3E9D6` |
| `--muted` (secondary text) | `#4A544F` | `#A9B3B0` |
| `--rule` (hairlines) | `#D8CFBE` | `rgba(243,233,214,0.16)` |
| `--accent` | `#2F5D4A` moss | `#E9B85C` lantern |
| `--night` (fixed dark sections) | `#0C1B24` | `#0C1B24` |
| `--night-deep` (footer) | `#070C19` | `#070C19` |

App band grounds are fixed per app and live in `apps.json` as `colors.{bg,text,muted,accent,frame}`: Mellow `#F7F5ED`/text `#2F5D4A`/muted `#46605A`, Pebble `#EFE7D6`/text `#4A4436`/muted `#5E5848`/accent `#35666F` (darkened from the app's `#4E8F97` to reach 4.5:1), Lanterns `#0E2029`/text `#F3E9D6`/muted `#C9C0AE`/accent `#E9B85C`, Orbit `#070C19`/text `#EEE6F2`/muted `#B9B3C4`/accent `#F2B08A`. Every band's text, muted, and accent colors meet 4.5:1 on their ground.

**Type**

- Newsreader (variable, weight axis only; the optical-size build was dropped for a 56% smaller download) for headlines, taglines, pull quotes, post titles. Italic light weight for taglines and the hero's second line.
- Instrument Sans for body, navigation, metadata, buttons. Sentence case everywhere. No tracked-out uppercase labels, no numbered markers.
- JetBrains Mono for code blocks only.
- Post body measure: 720px max, 19px/1.65. Headline scale from the canvas: 96 hero, 64 post title, 52 app name, 44 section heading, 32 post list title, 26 repo name.

**Motion.** None on load. `prefers-reduced-motion` respected. Hover: color change only.

**Theme toggle.** A small sun/moon button in the nav. Respects `prefers-color-scheme` by default; a manual choice is stored in `localStorage` and applied by a tiny inline script in `<head>` before paint to avoid a flash.

## 6. Content model

### 6.1 Blog posts — `src/content/posts/<slug>.md`

```yaml
---
title: "Mastering memory: how I tamed DOCX processing at scale"
description: "Streams, backpressure, and what finally stopped the heap from growing."
date: 2025-07-12
tags: [node, memory]
draft: false
---
```

Rules: `title`, `description`, `date` required; `tags` default `[]`; `draft` default `false` and drafts are excluded from builds, feed, and sitemap. Slug is the file name. Reading time is computed at build (words / 200, rounded up). Images referenced from a post live in `src/content/posts/<slug>/` beside it or in `public/images/posts/`.

### 6.2 Apps — `src/data/apps.json`

One entry per app: `slug`, `name`, `tagline`, `blurb`, `appStoreUrl`, `siteUrl`, `icon` (path in `public/apps/<slug>/icon.png`), `screenshot` (path plus alt text), `colors` (`bg`, `text`, `accent`), `order`. Icons and one App Store screenshot per app are committed to the repo; they were already pulled from the marketing sites and App Store during design.

### 6.3 About — `src/data/now.json`

The About page's "Right now" block (Building, Reading, Listening to) reads from a tiny JSON file so it can be updated without touching markup. The bio paragraphs and the portrait (`public/images/portrait.jpg`, the existing 960×1280 photo) live in the page itself. The "Elsewhere" list reuses the footer links.

### 6.4 Repos — `src/data/repos.json`

Curated list of GitHub repo names, in display order, with an optional hand-written `blurb` override:

```json
[
  { "repo": "alexvcasillas/animated-styled-components" },
  { "repo": "alexvcasillas/react-mobx-state-tree" },
  { "repo": "alexvcasillas/react-mobx-router" },
  { "repo": "alexvcasillas/react-onboarding" },
  { "repo": "alexvcasillas/react-spring-pop" },
  { "repo": "alexvcasillas/memory-monitor", "blurb": "Watch memory usage in Node.js and catch leaks early." }
]
```

At build, a loader fetches `https://api.github.com/repos/<repo>` for each entry and fills `stars`, `description` (unless overridden), `language`, and `url`. Home shows the first 6; `/open-source` shows all.

**Failure handling.** The fetch uses `GITHUB_TOKEN` when present (higher rate limit) and works without it. On any fetch error or non-200, the build does not fail: the loader falls back to `src/data/repos.cache.json`, a committed snapshot that the loader rewrites on every successful build. If neither the API nor the cache has an entry, the repo renders with its name and link and no star count. Fetch failures are logged as warnings at build time.

## 7. Components

Astro components, one file each, no client JS except the theme toggle:

- `BaseLayout` — html shell, `<head>` metadata, theme script, fonts, nav, footer, skip link.
- `Nav`, `Footer`, `ThemeToggle` (the only island; vanilla `<script>`).
- `Hero` — home only.
- `AppBand` — one app, props from `apps.json`; alternates screenshot side by index.
- `RepoList` — takes the loaded repo array and a `limit`.
- `PostList` — date column plus title and description.
- `prose.css` — global styles applied to a `div.prose` wrapper around rendered markdown (headings, links, code, blockquote, images, tables). Astro scoped styles cannot reach rendered markdown, so this is a stylesheet rather than a component.
- `TagList` — tag pills linking to `/writing/tag/<tag>`, used by the writing index and post page.
- `Seo` — title, description, canonical, Open Graph, Twitter card. Home OG image is a static PNG; posts fall back to it (per-post OG generation is out of scope).

## 8. Data flow

```
apps.json ─────────────┐
repos.json + GitHub ───┼──▶ Astro build ──▶ dist/ (static HTML, CSS, fonts, images)
posts/*.md ────────────┘        │
                                └──▶ rss.xml, sitemap
```

Everything resolves at build time. Nothing runs at request time.

## 9. Accessibility and quality floor

- Semantic landmarks, one `h1` per page, real links and buttons, visible focus rings, skip-to-content link.
- Color contrast at least 4.5:1 for body text on every ground, checked for each app band's text and accent.
- Images have alt text; decorative SVG icons are `aria-hidden`.
- Layout works down to 360px wide with a 20px gutter and no horizontal scroll.
- Lighthouse targets on the built site: Performance, Accessibility, Best Practices, SEO all at or above 95.

## 10. Testing

- `pnpm build` must succeed with and without network (network off exercises the repo cache fallback).
- Unit tests (Vitest) for: reading time calculation, draft filtering, repo loader fallback logic, post sorting.
- `astro check` for type errors in frontmatter and props.
- A build-time HTML validity pass over `dist/` (html-validate) and a broken internal link check.
- Manual pass in the browser at 360px, 768px, 1440px in both themes before merge.

## 11. Open copy items

To be filled by Alex before or during implementation; the build must not depend on them:

- Hero second paragraph, currently "Engineer at Tiptap, working on the editor a lot of the web writes in. Evenings go to open-source libraries and little iOS games that never rush you. Written from Córdoba, Spain."
- About page bio.
- LinkedIn URL and App Store developer page URL for the footer.
- First real blog post (the design used old article titles as sample content only).

## 12. Out of scope, possible later

Per-post Open Graph images, analytics, a Spanish translation, a uses page, view transitions between pages.
