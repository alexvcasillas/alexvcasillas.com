# alexvcasillas.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js site in this repo with a static Astro site that showcases four iOS apps, a curated list of GitHub repos with build-time star counts, and a markdown blog.

**Architecture:** Astro 7 static output. Content comes from three places: markdown posts in a content collection, JSON data files for apps and repos, and a build-time GitHub fetch with a committed cache fallback. Plain CSS with custom properties, self-hosted variable fonts, and one inline script for the theme toggle. Every page is rendered at build; nothing runs at request time.

**Tech Stack:** Astro 7.3, TypeScript, `@astrojs/rss` 4, `@astrojs/sitemap` 3, `@astrojs/check`, Vitest 5, `@fontsource-variable/{newsreader,instrument-sans,jetbrains-mono}` 5.3, `html-validate` 11, pnpm 11, Node 24.

**Spec:** `docs/superpowers/specs/2026-09-23-website-redesign-design.md`

**Visual reference:** https://claude.ai/artifact/Upv3cF6ixreYYE5dUS4q6H (artboards: Home desktop, Home phone, Blog post, Palette and type, About)

## Global Constraints

- Node 24, pnpm 11. Astro `output: 'static'`. `site: 'https://alexvcasillas.com'`.
- No Tailwind, no client framework. The only client-side JavaScript is the theme toggle (inline `<script is:inline>` in the head plus one small script in the toggle component).
- No contact email anywhere on the site. Contact routes are GitHub, App Store, LinkedIn, RSS.
- Copy is sentence case. No uppercase tracked-out labels, no numbered `01/02/03` markers, no middle-dot separators, no `→` glyphs appended to link text.
- Palette tokens (light / dark): `--paper #F6F2E8 / #0C1B24`, `--ink #1F2A26 / #F3E9D6`, `--muted #4A544F / #A9B3B0`, `--rule #D8CFBE / rgba(243,233,214,0.16)`, `--accent #2F5D4A / #E9B85C`, `--night #0C1B24` (both), `--night-deep #070C19` (both).
- Fonts: `'Newsreader Variable'` for display, `'Instrument Sans Variable'` for body, `'JetBrains Mono Variable'` for code. Self-hosted via fontsource; no Google Fonts requests.
- Post body measure 720px max, 19px / 1.65 line-height.
- Drafts (`draft: true`) never appear in pages, feed, or sitemap.
- `pnpm build` must succeed with no network access (repo cache fallback).
- Layout works at 360px with a 20px gutter and no horizontal scroll. `prefers-reduced-motion` respected (there is no motion to begin with).
- Real `<a href>` and `<button>` elements, visible focus rings, skip link, one `h1` per page, alt text on all images, `aria-hidden` on decorative SVG.
- Commit after every task with a conventional-commit message.

---

## File structure

```
astro.config.mjs               Astro config: site, integrations, Shiki theme
package.json                   scripts: dev, build, preview, check, test, validate
tsconfig.json                  extends astro/tsconfigs/strict
vitest.config.ts               uses getViteConfig from astro/config
src/content.config.ts          posts collection schema
src/content/posts/*.md         blog posts (one starter post)
src/data/apps.json             four apps: copy, links, colors, asset paths
src/data/repos.json            curated repo list (order + optional blurb)
src/data/repos.cache.json      last successful GitHub snapshot (committed)
src/data/now.json              About page "Right now" lines
src/data/links.json            GitHub / App Store / LinkedIn / RSS links
src/lib/reading-time.ts        readingTime(text) -> minutes
src/lib/posts.ts               getPublishedPosts(), sortNewestFirst(), tagsOf()
src/lib/repos.ts               loadRepos(entries, deps) pure loader with fallback
src/lib/repos-build.ts         reads JSON, calls loadRepos, writes cache, memoized
src/lib/site.ts                SITE constants (name, url, description)
src/styles/tokens.css          custom properties, light/dark
src/styles/global.css          reset, type scale, layout helpers, focus, skip link
src/styles/prose.css           rendered markdown styles
src/shiki/paper-night.json     custom Shiki theme
src/layouts/BaseLayout.astro   html shell, head, fonts, theme script, Nav, Footer
src/components/Seo.astro       title/description/canonical/OG/Twitter
src/components/Nav.astro
src/components/ThemeToggle.astro
src/components/Footer.astro
src/components/Hero.astro
src/components/AppBand.astro
src/components/RepoList.astro
src/components/PostList.astro
src/components/SectionHeading.astro  heading + right-aligned intro used on Home
src/pages/index.astro
src/pages/apps.astro
src/pages/open-source.astro
src/pages/writing/index.astro
src/pages/writing/[slug].astro
src/pages/writing/tag/[tag].astro
src/pages/about.astro
src/pages/rss.xml.ts
src/pages/404.astro
public/apps/<slug>/icon.png, screenshot.jpg
public/images/portrait.jpg
public/og.png
public/favicon.svg
scripts/og.mjs                 renders public/og.png from an SVG with sharp
scripts/check-links.mjs        internal link check over dist/
tests/reading-time.test.ts
tests/posts.test.ts
tests/repos.test.ts
```

---

### Task 1: Clean slate and Astro scaffold

**Files:**
- Delete: `src/`, `public/`, `next.config.mjs`, `postcss.config.js`, `tailwind.config.js`, `jsconfig.json`, `prettier.config.js`, `pnpm-lock.yaml`, `.eslintrc*`, `.next/` if present
- Keep and later overwrite: `README.md`, `.gitignore`
- Preserve before deleting: `src/images/portrait.jpg` → `public/images/portrait.jpg`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/lib/site.ts`, `public/favicon.svg`

**Interfaces:**
- Produces: `SITE` from `src/lib/site.ts`: `{ name: string; url: string; description: string; author: string }`.

- [ ] **Step 1: Preserve the portrait, then remove the old site**

```bash
mkdir -p /tmp/keep && cp src/images/portrait.jpg /tmp/keep/portrait.jpg
git rm -rq src public next.config.mjs postcss.config.js tailwind.config.js jsconfig.json prettier.config.js pnpm-lock.yaml
rm -rf .next node_modules
mkdir -p public/images && cp /tmp/keep/portrait.jpg public/images/portrait.jpg
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "alexvcasillas.com",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=24" },
  "packageManager": "pnpm@11.5.2",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "og": "node scripts/og.mjs",
    "validate": "html-validate \"dist/**/*.html\" && node scripts/check-links.mjs"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.19",
    "@astrojs/sitemap": "^3.7.4",
    "@fontsource-variable/instrument-sans": "^5.3.0",
    "@fontsource-variable/jetbrains-mono": "^5.3.0",
    "@fontsource-variable/newsreader": "^5.3.0",
    "astro": "^7.3.4"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.10",
    "html-validate": "^11.16.0",
    "sharp": "^0.34.0",
    "typescript": "^5.9.0",
    "vitest": "^5.0.1"
  }
}
```

- [ ] **Step 3: Write astro.config.mjs, tsconfig.json, .gitignore**

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alexvcasillas.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
```

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`.gitignore`:
```
node_modules
dist
.astro
.DS_Store
```

- [ ] **Step 4: Write src/lib/site.ts and a placeholder home page**

`src/lib/site.ts`:
```ts
export const SITE = {
  name: 'Alex Casillas',
  url: 'https://alexvcasillas.com',
  description:
    'Small, quiet software. Four free iOS games, open-source libraries for React and Node, and writing about building them.',
  author: 'Alex Casillas',
} as const;
```

`src/pages/index.astro`:
```astro
---
import { SITE } from '../lib/site';
---
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>{SITE.name}</title></head>
  <body><h1>{SITE.name}</h1></body>
</html>
```

`public/favicon.svg` (a moss square with a paper dot, matching the palette):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2F5D4A"/><circle cx="16" cy="16" r="6" fill="#F6F2E8"/></svg>
```

- [ ] **Step 5: Install and build**

Run: `pnpm install && pnpm build`
Expected: build completes, `dist/index.html` exists and contains `<h1>Alex Casillas</h1>`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: replace Next.js site with Astro scaffold"
```

---

### Task 2: Design tokens, global styles, fonts, and base layout

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/Seo.astro`, `src/components/Nav.astro`, `src/components/ThemeToggle.astro`, `src/components/Footer.astro`, `src/data/links.json`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `BaseLayout` props `{ title: string; description?: string; ogImage?: string; class?: string }`. Slot: page content inside `<main id="content">`.
- Produces: `links.json` shape `Array<{ label: string; href: string; note: string }>`.
- Produces: CSS classes used by later tasks: `.wrap` (max-width 1200px, 20px gutter, 120px at ≥1280px), `.serif`, `.h1`, `.h2`, `.h3`, `.lede`, `.muted`, `.link-arrow`, `.on-night` (sets tokens to the night ground), `.hairline-list`.

- [ ] **Step 1: Write tokens.css**

```css
:root {
  --paper: #F6F2E8;
  --ink: #1F2A26;
  --muted: #4A544F;
  --rule: #D8CFBE;
  --accent: #2F5D4A;
  --night: #0C1B24;
  --night-deep: #070C19;
  --night-ink: #F3E9D6;
  --night-muted: #A9B3B0;
  --night-rule: rgba(243, 233, 214, 0.16);
  --night-accent: #E9B85C;

  --font-display: 'Newsreader Variable', Georgia, 'Times New Roman', serif;
  --font-body: 'Instrument Sans Variable', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono Variable', ui-monospace, SFMono-Regular, monospace;

  --gutter: 20px;
  --measure: 720px;
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #0C1B24;
    --ink: #F3E9D6;
    --muted: #A9B3B0;
    --rule: rgba(243, 233, 214, 0.16);
    --accent: #E9B85C;
    color-scheme: dark;
  }
}

:root[data-theme="dark"] {
  --paper: #0C1B24;
  --ink: #F3E9D6;
  --muted: #A9B3B0;
  --rule: rgba(243, 233, 214, 0.16);
  --accent: #E9B85C;
  color-scheme: dark;
}

/* Sections that are always night, in both themes */
.on-night {
  --paper: var(--night);
  --ink: var(--night-ink);
  --muted: var(--night-muted);
  --rule: var(--night-rule);
  --accent: var(--night-accent);
  background: var(--paper);
  color: var(--ink);
}
.on-night-deep {
  --paper: var(--night-deep);
  --ink: var(--night-ink);
  --muted: var(--night-muted);
  --rule: var(--night-rule);
  --accent: var(--night-accent);
  background: var(--paper);
  color: var(--ink);
}
```

- [ ] **Step 2: Write global.css**

```css
@import '@fontsource-variable/newsreader/standard.css';
@import '@fontsource-variable/newsreader/standard-italic.css';
@import '@fontsource-variable/instrument-sans/wght.css';
@import '@fontsource-variable/jetbrains-mono/wght.css';
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
a:hover { color: var(--accent); }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
ul[role="list"], ol[role="list"] { list-style: none; margin: 0; padding: 0; }
h1, h2, h3, p { margin: 0; }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

.skip-link {
  position: absolute; left: var(--gutter); top: -100px;
  padding: 10px 14px; background: var(--accent); color: var(--paper); border-radius: 999px;
}
.skip-link:focus { top: 12px; z-index: 10; }

.wrap { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: var(--gutter); }
@media (min-width: 1280px) { .wrap { max-width: none; padding-inline: 120px; } }

.serif { font-family: var(--font-display); font-optical-sizing: auto; }
.h1 { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.02em; line-height: 1.0; font-size: clamp(44px, 7vw, 96px); }
.h2 { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.015em; line-height: 1.1; font-size: clamp(30px, 3.5vw, 44px); }
.h3 { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.02em; line-height: 1.0; font-size: clamp(36px, 4vw, 52px); }
.italic-light { font-style: italic; font-weight: 300; }
.lede { font-size: clamp(17px, 1.5vw, 21px); line-height: 1.55; color: var(--muted); max-width: 620px; }
.muted { color: var(--muted); }

.link-arrow { display: inline-flex; align-items: center; gap: 10px; font-weight: 600; color: var(--accent); }
.link-arrow svg { width: 16px; height: 16px; }

.pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 22px; border: 1.5px solid var(--ink); border-radius: 999px; font-weight: 500;
}
.pill:hover { border-color: var(--accent); }

.hairline-list > li { border-top: 1px solid var(--rule); }
.hairline-list > li:last-child { border-bottom: 1px solid var(--rule); }

.section { padding-block: clamp(64px, 8vw, 120px); }
.section-head { display: flex; flex-direction: column; gap: 16px; }
@media (min-width: 900px) {
  .section-head { flex-direction: row; align-items: flex-end; justify-content: space-between; }
  .section-head p { max-width: 420px; }
}

@media (prefers-reduced-motion: no-preference) {
  a, button { transition: color 120ms ease, border-color 120ms ease; }
}
```

- [ ] **Step 3: Write links.json**

```json
[
  { "label": "GitHub", "href": "https://github.com/alexvcasillas", "note": "@alexvcasillas" },
  { "label": "App Store", "href": "https://apps.apple.com/us/developer/alex-casillas/id6811995654", "note": "four free games" },
  { "label": "LinkedIn", "href": "https://www.linkedin.com/in/alexvcasillas", "note": "say hello there" },
  { "label": "RSS", "href": "/rss.xml", "note": "new posts, no inbox" }
]
```

Note for the implementer: the App Store developer URL and LinkedIn URL are the best guess from public pages. They are spec section 11 open items; leave them as written and flag them in the task report.

- [ ] **Step 4: Write Seo.astro**

```astro
---
import { SITE } from '../lib/site';
interface Props { title: string; description?: string; ogImage?: string }
const { title, description = SITE.description, ogImage = '/og.png' } = Astro.props;
const fullTitle = title === SITE.name ? title : `${title}, ${SITE.name}`;
const canonical = new URL(Astro.url.pathname, Astro.site);
const image = new URL(ogImage, Astro.site);
---
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:type" content="website" />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={image} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
```

- [ ] **Step 5: Write ThemeToggle.astro**

```astro
---
---
<button class="theme-toggle" type="button" aria-label="Switch to dark theme" data-theme-toggle>
  <svg class="sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
  <svg class="moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
</button>

<style>
  .theme-toggle { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; }
  .theme-toggle:hover { color: var(--accent); }
  .moon { display: none; }
  :global(:root[data-theme="dark"]) .sun { display: none; }
  :global(:root[data-theme="dark"]) .moon { display: block; }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme="light"])) .sun { display: none; }
    :global(:root:not([data-theme="light"])) .moon { display: block; }
  }
</style>

<script>
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = () => root.dataset.theme ?? (prefersDark() ? 'dark' : 'light');
  const label = () => {
    if (button) button.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  button?.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    label();
  });
  label();
</script>
```

- [ ] **Step 6: Write Nav.astro and Footer.astro**

`Nav.astro`:
```astro
---
import ThemeToggle from './ThemeToggle.astro';
import { SITE } from '../lib/site';
const items = [
  { href: '/apps', label: 'Apps' },
  { href: '/open-source', label: 'Open source' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];
const path = Astro.url.pathname;
const isActive = (href: string) => path === href || path.startsWith(href + '/');
---
<header class="nav wrap">
  <a href="/" class="serif brand">{SITE.name}</a>
  <nav aria-label="Main">
    <ul role="list">
      {items.map((item) => (
        <li><a href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a></li>
      ))}
    </ul>
  </nav>
  <ThemeToggle />
</header>

<style>
  .nav { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 96px; padding-block: 20px; }
  .brand { font-size: 24px; font-weight: 500; letter-spacing: -0.01em; }
  ul { display: flex; gap: clamp(16px, 3vw, 40px); font-weight: 500; font-size: 16px; }
  a[aria-current="page"] { color: var(--accent); border-bottom: 1.5px solid var(--accent); padding-bottom: 2px; }
  @media (max-width: 599px) {
    .nav { flex-wrap: wrap; min-height: 64px; }
    nav { order: 3; width: 100%; }
    ul { justify-content: space-between; font-size: 15px; }
  }
</style>
```

`Footer.astro`:
```astro
---
import links from '../data/links.json';
import { SITE } from '../lib/site';
---
<footer class="footer on-night-deep">
  <div class="wrap inner">
    <div>
      <p class="serif name">{SITE.name}</p>
      <p class="muted">Córdoba, Spain</p>
    </div>
    <ul role="list" class="links">
      {links.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
    </ul>
  </div>
</footer>

<style>
  .footer { border-top: 1px solid var(--rule); padding-block: 56px 64px; }
  .inner { display: flex; flex-direction: column; gap: 28px; }
  .name { font-size: 30px; line-height: 1.2; margin-bottom: 8px; }
  .links { display: flex; flex-wrap: wrap; gap: 24px 32px; font-size: 15px; color: var(--muted); }
  @media (min-width: 700px) { .inner { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
</style>
```

- [ ] **Step 7: Write BaseLayout.astro**

```astro
---
import '../styles/global.css';
import Seo from '../components/Seo.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
interface Props { title: string; description?: string; ogImage?: string; class?: string }
const { title, description, ogImage, class: className } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate" type="application/rss+xml" title="Alex Casillas, writing" href="/rss.xml" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <script is:inline>
      (function () {
        try {
          var t = localStorage.getItem('theme');
          if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
        } catch (e) {}
      })();
    </script>
    <Seo title={title} description={description} ogImage={ogImage} />
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    <Nav />
    <main id="content" class={className}>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 8: Point index.astro at the layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { SITE } from '../lib/site';
---
<BaseLayout title={SITE.name}>
  <section class="wrap section">
    <h1 class="h1">I make small, quiet software.</h1>
  </section>
</BaseLayout>
```

- [ ] **Step 9: Build and inspect**

Run: `pnpm build && grep -c "fontsource" dist/_astro/*.css | head -1 && grep -o 'data-theme-toggle' dist/index.html`
Expected: build succeeds; CSS bundle contains font-face rules; `data-theme-toggle` present. Then `pnpm preview` and confirm in a browser at 360px and 1440px: nav wraps on phone, toggle switches theme and persists on reload, skip link appears on Tab.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: tokens, global styles, fonts, and base layout with theme toggle"
```

---

### Task 3: Apps data, assets, AppBand, and /apps page

**Files:**
- Create: `src/data/apps.json`, `src/components/AppBand.astro`, `src/pages/apps.astro`, `public/apps/mellow-sudoku/{icon.png,screenshot.jpg}`, `public/apps/pebble-paths/{icon.png,screenshot.jpg}`, `public/apps/little-lanterns/{icon.png,screenshot.jpg}`, `public/apps/pocket-orbit/{icon.png,screenshot.jpg}`

**Interfaces:**
- Produces: `apps.json` entry type
  ```ts
  type App = { slug: string; name: string; tagline: string; blurb: string; appStoreUrl: string; siteUrl: string;
    icon: string; screenshot: { src: string; alt: string }; colors: { bg: string; text: string; accent: string; frame: string }; order: number }
  ```
- Produces: `AppBand` props `{ app: App; index: number }` (odd index puts the screenshot on the left at desktop).

- [ ] **Step 1: Download assets**

```bash
mkdir -p public/apps/{mellow-sudoku,pebble-paths,little-lanterns,pocket-orbit}
curl -sL -o public/apps/mellow-sudoku/icon.png https://mellow-sudoku.alexvcasillas.dev/assets/app-icon.png
curl -sL -o public/apps/pebble-paths/icon.png https://pebble-paths.alexvcasillas.dev/assets/icon.png
curl -sL -o public/apps/little-lanterns/icon.png https://little-lanterns.alexvcasillas.dev/assets/icon.png
curl -sL -o public/apps/pocket-orbit/icon.png https://pocket-orbit.alexvcasillas.dev/assets/icon.png
curl -s "https://itunes.apple.com/lookup?id=6811995655,6812444365,6814389229,6814419406&country=us" > /tmp/apps.json
node -e '
const m={"Mellow Sudoku":"mellow-sudoku","Pebble Paths":"pebble-paths","Little Lanterns":"little-lanterns","Pocket Orbit: Tiny Journeys":"pocket-orbit"};
const d=JSON.parse(require("fs").readFileSync("/tmp/apps.json","utf8"));
for (const r of d.results) console.log(m[r.trackName], r.screenshotUrls[0].replace("320x480bb","1290x0w"));
' | while read slug url; do curl -sL -o "public/apps/$slug/screenshot.jpg" "$url"; done
# Icons are 1024px PNGs; downsize to 256px to keep the repo small
for s in mellow-sudoku pebble-paths little-lanterns pocket-orbit; do
  node -e 'const s=require("sharp");s(process.argv[1]).resize(256).png().toFile(process.argv[1]+".tmp").then(()=>require("fs").renameSync(process.argv[1]+".tmp",process.argv[1]))' "public/apps/$s/icon.png"
  node -e 'const s=require("sharp");s(process.argv[1]).resize(720).jpeg({quality:82}).toFile(process.argv[1]+".tmp").then(()=>require("fs").renameSync(process.argv[1]+".tmp",process.argv[1]))' "public/apps/$s/screenshot.jpg"
done
ls -la public/apps/*/
```
Expected: eight files, icons ≈ 20–120 KB, screenshots ≈ 60–150 KB.

- [ ] **Step 2: Write apps.json**

```json
[
  {
    "slug": "mellow-sudoku",
    "name": "Mellow Sudoku",
    "tagline": "Let the world wait a little.",
    "blurb": "A calm Sudoku on warm paper. Three difficulties, pencil notes, undo, and a hint when you want one. Your puzzle waits exactly where you left it.",
    "appStoreUrl": "https://apps.apple.com/us/app/mellow-sudoku/id6811995655",
    "siteUrl": "https://mellow-sudoku.alexvcasillas.dev",
    "icon": "/apps/mellow-sudoku/icon.png",
    "screenshot": { "src": "/apps/mellow-sudoku/screenshot.jpg", "alt": "Mellow Sudoku, an easy puzzle in progress" },
    "colors": { "bg": "#F7F5ED", "text": "#2F5D4A", "accent": "#2F5D4A", "frame": "#26332E" },
    "order": 1
  },
  {
    "slug": "pebble-paths",
    "name": "Pebble Paths",
    "tagline": "Find a path. Grow a little calm.",
    "blurb": "Turn carved stones to carry water from the spring to the garden, and watch it bloom. Gardens from 4×4 to 6×6, unlimited hints, no clocks.",
    "appStoreUrl": "https://apps.apple.com/us/app/pebble-paths/id6812444365",
    "siteUrl": "https://pebble-paths.alexvcasillas.dev",
    "icon": "/apps/pebble-paths/icon.png",
    "screenshot": { "src": "/apps/pebble-paths/screenshot.jpg", "alt": "Pebble Paths, garden 13 with a water channel forming" },
    "colors": { "bg": "#EFE7D6", "text": "#4A4436", "accent": "#4E8F97", "frame": "#3E3A30" },
    "order": 2
  },
  {
    "slug": "little-lanterns",
    "name": "Little Lanterns",
    "tagline": "Small puzzles. Softer evenings.",
    "blurb": "Tap a lantern and its neighbours change with it. Light them all. Soft chimes, warm glow, and a gentle sway, wherever the evening finds you.",
    "appStoreUrl": "https://apps.apple.com/us/app/little-lanterns/id6814389229",
    "siteUrl": "https://little-lanterns.alexvcasillas.dev",
    "icon": "/apps/little-lanterns/icon.png",
    "screenshot": { "src": "/apps/little-lanterns/screenshot.jpg", "alt": "Little Lanterns title screen with one lantern glowing" },
    "colors": { "bg": "#0E2029", "text": "#F3E9D6", "accent": "#E9B85C", "frame": "#1B2B33" },
    "order": 3
  },
  {
    "slug": "pocket-orbit",
    "name": "Pocket Orbit",
    "tagline": "A tiny moon. A universe of possibility.",
    "blurb": "Your moon circles a planet. Tap to launch, catch the next glowing orbit, and keep the journey going. Take as many laps as you need.",
    "appStoreUrl": "https://apps.apple.com/us/app/pocket-orbit-tiny-journeys/id6814419406",
    "siteUrl": "https://pocket-orbit.alexvcasillas.dev",
    "icon": "/apps/pocket-orbit/icon.png",
    "screenshot": { "src": "/apps/pocket-orbit/screenshot.jpg", "alt": "Pocket Orbit, a moon circling a planet before launch" },
    "colors": { "bg": "#070C19", "text": "#EEE6F2", "accent": "#F2B08A", "frame": "#161B2C" },
    "order": 4
  }
]
```

- [ ] **Step 3: Write AppBand.astro**

```astro
---
interface App {
  slug: string; name: string; tagline: string; blurb: string; appStoreUrl: string; siteUrl: string;
  icon: string; screenshot: { src: string; alt: string };
  colors: { bg: string; text: string; accent: string; frame: string }; order: number;
}
interface Props { app: App; index: number }
const { app, index } = Astro.props;
const flipped = index % 2 === 1;
const muted = app.colors.text + 'CC';
---
<section
  class:list={['band', { flipped }]}
  style={`--band-bg:${app.colors.bg};--band-text:${app.colors.text};--band-accent:${app.colors.accent};--band-frame:${app.colors.frame};--band-muted:${muted}`}
  aria-labelledby={`app-${app.slug}`}
>
  <div class="wrap grid">
    <div class="copy">
      <img class="icon" src={app.icon} alt="" width="76" height="76" loading="lazy" />
      <h3 class="h3" id={`app-${app.slug}`}>{app.name}</h3>
      <p class="serif tagline italic-light">{app.tagline}</p>
      <p class="blurb">{app.blurb}</p>
      <a class="link-arrow" href={app.appStoreUrl} style="color: var(--band-accent)">
        Get it on the App Store
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
      </a>
    </div>
    <div class="shot">
      <img src={app.screenshot.src} alt={app.screenshot.alt} width="300" height="650" loading="lazy" />
    </div>
  </div>
</section>

<style>
  .band { background: var(--band-bg); color: var(--band-text); overflow: hidden; }
  .grid { display: grid; gap: 40px; padding-block: 56px 0; }
  .copy { display: flex; flex-direction: column; gap: 20px; }
  .icon { width: 76px; height: 76px; border-radius: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
  .tagline { font-size: clamp(22px, 2vw, 26px); line-height: 1.3; color: var(--band-accent); }
  .blurb { max-width: 460px; color: var(--band-muted); line-height: 1.55; }
  .shot { display: flex; justify-content: center; align-items: flex-start; }
  .shot img {
    width: min(300px, 70vw); height: auto; border-radius: 40px; border: 8px solid var(--band-frame);
    box-shadow: 0 30px 60px rgba(0,0,0,0.25); transform: rotate(-3deg) translateY(24px);
  }
  .flipped .shot img { transform: rotate(3deg) translateY(24px); }
  @media (min-width: 900px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 80px; align-items: center; padding-block: 88px 0; min-height: 560px; }
    .shot { height: 384px; }
    .shot img { transform: rotate(-3deg) translateY(60px); }
    .flipped .copy { order: 2; }
    .flipped .shot { order: 1; }
    .flipped .shot img { transform: rotate(3deg) translateY(60px); }
  }
</style>
```

Note: the band's `.link-arrow` color is set inline to the band accent so the global `--accent` token doesn't leak in.

- [ ] **Step 4: Write apps.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AppBand from '../components/AppBand.astro';
import apps from '../data/apps.json';
const sorted = [...apps].sort((a, b) => a.order - b.order);
---
<BaseLayout title="Apps" description="Four free games for iPhone and iPad. No timers, no ads, no accounts.">
  <section class="wrap section-head intro">
    <h1 class="h2">Four little games for iPhone and iPad.</h1>
    <p class="muted">No timers, no ads, no accounts. They play offline and they are free. Morning to night, top to bottom.</p>
  </section>
  {sorted.map((app, i) => <AppBand app={app} index={i} />)}
</BaseLayout>

<style>
  .intro { padding-block: 40px 56px; }
</style>
```

- [ ] **Step 5: Build and check**

Run: `pnpm build && grep -c '<section class="band' dist/apps/index.html`
Expected: `4`. Preview at 360px: each band stacks copy over screenshot, no horizontal scroll. At 1440px: bands alternate sides.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: apps data, AppBand component, and /apps page"
```

---

### Task 4: Reading time and posts helpers (TDD)

**Files:**
- Create: `vitest.config.ts`, `src/lib/reading-time.ts`, `src/lib/posts.ts`, `tests/reading-time.test.ts`, `tests/posts.test.ts`

**Interfaces:**
- Produces: `readingTime(text: string): number` (minutes, ≥1, ceil(words/200)).
- Produces: from `posts.ts`:
  ```ts
  export type PostLike = { id: string; data: { title: string; description: string; date: Date; tags: string[]; draft: boolean } };
  export function publishedOnly<T extends PostLike>(posts: T[]): T[];
  export function sortNewestFirst<T extends PostLike>(posts: T[]): T[];
  export function allTags(posts: PostLike[]): string[];   // unique, sorted a→z
  export function formatDate(d: Date): string;             // "12 July 2025"
  ```

- [ ] **Step 1: Write vitest.config.ts**

```ts
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: { include: ['tests/**/*.test.ts'] },
});
```

- [ ] **Step 2: Write the failing reading-time test**

`tests/reading-time.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { readingTime } from '../src/lib/reading-time';

describe('readingTime', () => {
  it('returns at least 1 minute for short text', () => {
    expect(readingTime('hello world')).toBe(1);
  });
  it('rounds up at 200 words per minute', () => {
    const words = Array.from({ length: 401 }, () => 'word').join(' ');
    expect(readingTime(words)).toBe(3);
  });
  it('ignores markdown punctuation and code fences', () => {
    const text = '# Title\n\n```js\nconst a = 1\n```\n\n' + Array.from({ length: 200 }, () => 'w').join(' ');
    expect(readingTime(text)).toBe(2);
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `pnpm test`
Expected: FAIL, cannot find module `../src/lib/reading-time`.

- [ ] **Step 4: Implement reading-time.ts**

```ts
const WORDS_PER_MINUTE = 200;

export function readingTime(text: string): number {
  const words = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~\-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
```

Note: the third test has a code fence of 3 words removed plus 1 heading word plus 200 words = 201 words → 2 minutes.

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test`
Expected: 3 passed.

- [ ] **Step 6: Write the failing posts test**

`tests/posts.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { publishedOnly, sortNewestFirst, allTags, formatDate } from '../src/lib/posts';

const post = (id: string, date: string, tags: string[] = [], draft = false) => ({
  id,
  data: { title: id, description: '', date: new Date(date), tags, draft },
});

describe('posts helpers', () => {
  it('filters out drafts', () => {
    const result = publishedOnly([post('a', '2025-01-01'), post('b', '2025-01-02', [], true)]);
    expect(result.map((p) => p.id)).toEqual(['a']);
  });
  it('sorts newest first without mutating input', () => {
    const input = [post('old', '2023-05-31'), post('new', '2025-07-12')];
    const result = sortNewestFirst(input);
    expect(result.map((p) => p.id)).toEqual(['new', 'old']);
    expect(input[0].id).toBe('old');
  });
  it('collects unique sorted tags', () => {
    expect(allTags([post('a', '2025-01-01', ['node', 'memory']), post('b', '2025-01-02', ['node'])])).toEqual(['memory', 'node']);
  });
  it('formats dates as day month year', () => {
    expect(formatDate(new Date('2025-07-12T00:00:00Z'))).toBe('12 July 2025');
  });
});
```

- [ ] **Step 7: Run it to verify it fails**

Run: `pnpm test`
Expected: FAIL, cannot find module `../src/lib/posts`.

- [ ] **Step 8: Implement posts.ts**

```ts
export type PostLike = {
  id: string;
  data: { title: string; description: string; date: Date; tags: string[]; draft: boolean };
};

export function publishedOnly<T extends PostLike>(posts: T[]): T[] {
  return posts.filter((p) => !p.data.draft);
}

export function sortNewestFirst<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function allTags(posts: PostLike[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort((a, b) => a.localeCompare(b));
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}
```

- [ ] **Step 9: Run tests to verify they pass**

Run: `pnpm test`
Expected: 7 passed.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: reading time and post list helpers with tests"
```

---

### Task 5: Posts collection, Shiki theme, prose styles, writing index and post page

**Files:**
- Create: `src/content.config.ts`, `src/content/posts/a-new-site.md`, `src/shiki/paper-night.json`, `src/styles/prose.css`, `src/components/PostList.astro`, `src/pages/writing/index.astro`, `src/pages/writing/[slug].astro`
- Modify: `astro.config.mjs`

**Interfaces:**
- Consumes: `publishedOnly`, `sortNewestFirst`, `formatDate` from Task 4; `readingTime` from Task 4.
- Produces: collection `posts` with schema `{ title: string; description: string; date: Date; tags: string[]; draft: boolean }`. Post URL is `/writing/<id>`.
- Produces: `PostList` props `{ posts: Array<{ id: string; data: { title: string; description: string; date: Date } }> }`.

- [ ] **Step 1: Write content.config.ts**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

- [ ] **Step 2: Write the starter post**

`src/content/posts/a-new-site.md`:
```md
---
title: "A new site, built to stay out of the way"
description: "Why this site is static, why the posts are markdown files, and what will show up here."
date: 2026-09-23
tags: [meta]
draft: false
---

This site used to be a Next.js app. It is now a folder of markdown files and a build step, and that is the whole point.

Three things live here: the four little games I make for iPhone and iPad, the open-source libraries I keep around, and this writing. Posts are plain markdown with a little frontmatter, so publishing is a commit.

```ts
// Everything on the site resolves at build time.
const stars = await loadRepos(curated, { cache, fetchFn: fetch });
```

Expect notes on JavaScript, Node, memory, SwiftUI, and whatever else caught my attention that week.
```

- [ ] **Step 3: Write the Shiki theme**

`src/shiki/paper-night.json`:
```json
{
  "name": "paper-night",
  "type": "dark",
  "colors": {
    "editor.background": "#0C1B24",
    "editor.foreground": "#DDD6C6"
  },
  "tokenColors": [
    { "scope": ["comment", "punctuation.definition.comment"], "settings": { "foreground": "#7E8B88", "fontStyle": "italic" } },
    { "scope": ["keyword", "storage", "storage.type", "keyword.operator", "keyword.control"], "settings": { "foreground": "#E9B85C" } },
    { "scope": ["string", "string.quoted", "punctuation.definition.string"], "settings": { "foreground": "#9FCBB4" } },
    { "scope": ["constant.numeric", "constant.language", "constant.character"], "settings": { "foreground": "#B9C8F0" } },
    { "scope": ["entity.name.function", "support.function", "meta.function-call entity.name.function"], "settings": { "foreground": "#F2B08A" } },
    { "scope": ["entity.name.type", "support.type", "support.class", "entity.name.class"], "settings": { "foreground": "#F3E9D6" } },
    { "scope": ["variable", "variable.other", "variable.parameter"], "settings": { "foreground": "#DDD6C6" } },
    { "scope": ["punctuation", "meta.brace"], "settings": { "foreground": "#A9B3B0" } },
    { "scope": ["entity.name.tag"], "settings": { "foreground": "#E9B85C" } },
    { "scope": ["entity.other.attribute-name"], "settings": { "foreground": "#F2B08A" } }
  ]
}
```

- [ ] **Step 4: Register the theme in astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import paperNight from './src/shiki/paper-night.json';

export default defineConfig({
  site: 'https://alexvcasillas.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: paperNight, wrap: false },
  },
});
```

- [ ] **Step 5: Write prose.css**

```css
.prose { max-width: var(--measure); font-size: 19px; line-height: 1.65; }
.prose > * + * { margin-top: 28px; }
.prose h2, .prose h3 { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.015em; line-height: 1.15; margin-top: 48px; }
.prose h2 { font-size: clamp(28px, 3vw, 36px); }
.prose h3 { font-size: clamp(24px, 2.5vw, 28px); }
.prose a { color: var(--accent); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.prose a:hover { text-decoration-thickness: 2px; }
.prose blockquote {
  margin: 12px 0; padding: 4px 0 4px 28px; border-left: 2px solid var(--accent);
  font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 28px); line-height: 1.3; font-weight: 300; font-style: italic; color: var(--accent);
}
.prose blockquote p { margin: 0; }
.prose ul, .prose ol { padding-left: 24px; }
.prose li + li { margin-top: 8px; }
.prose img { border-radius: 12px; }
.prose figcaption { font-size: 15px; color: var(--muted); margin-top: 8px; }
.prose hr { border: 0; border-top: 1px solid var(--rule); margin-block: 48px; }
.prose table { width: 100%; border-collapse: collapse; font-size: 16px; }
.prose th, .prose td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--rule); }
.prose code { font-family: var(--font-mono); font-size: 0.88em; }
.prose :not(pre) > code { background: var(--rule); padding: 2px 6px; border-radius: 6px; }
.prose pre.astro-code {
  margin: 8px 0; padding: 24px 28px; border-radius: 12px; font-size: 15px; line-height: 1.6; overflow-x: auto;
  background: var(--night) !important;
}
.prose pre.astro-code code { background: none; padding: 0; font-size: inherit; }
```

- [ ] **Step 6: Write PostList.astro**

```astro
---
import { formatDate } from '../lib/posts';
interface Props { posts: Array<{ id: string; data: { title: string; description: string; date: Date } }> }
const { posts } = Astro.props;
---
<ul role="list" class="hairline-list posts">
  {posts.map((post) => (
    <li class="row">
      <time class="muted" datetime={post.data.date.toISOString().slice(0, 10)}>{formatDate(post.data.date)}</time>
      <a href={`/writing/${post.id}`} class="entry">
        <span class="serif title">{post.data.title}</span>
        <span class="muted">{post.data.description}</span>
      </a>
    </li>
  ))}
</ul>

<style>
  .row { display: grid; gap: 8px; padding-block: 24px; }
  .entry { display: flex; flex-direction: column; gap: 8px; }
  .title { font-size: clamp(24px, 2.4vw, 32px); line-height: 1.15; letter-spacing: -0.01em; }
  time { font-size: 15px; }
  @media (min-width: 700px) {
    .row { grid-template-columns: 200px 1fr; gap: 40px; align-items: baseline; padding-block: 28px; }
  }
</style>
```

- [ ] **Step 7: Write writing/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostList from '../../components/PostList.astro';
import { publishedOnly, sortNewestFirst, allTags } from '../../lib/posts';

const posts = sortNewestFirst(publishedOnly(await getCollection('posts')));
const tags = allTags(posts);
---
<BaseLayout title="Writing" description="Notes on JavaScript, Node, memory, SwiftUI, and whatever else caught my attention that week.">
  <section class="wrap section">
    <div class="section-head">
      <h1 class="h2">Writing</h1>
      <p class="muted">Notes on JavaScript, Node, memory, SwiftUI, and whatever else caught my attention that week.</p>
    </div>
    {tags.length > 0 && (
      <ul role="list" class="tags">
        {tags.map((tag) => <li><a class="tag" href={`/writing/tag/${tag}`}>{tag}</a></li>)}
      </ul>
    )}
    <PostList posts={posts} />
  </section>
</BaseLayout>

<style>
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-block: 32px 40px; }
  .tag { display: inline-block; padding: 6px 14px; border: 1px solid var(--rule); border-radius: 999px; font-size: 14px; color: var(--muted); }
  .tag:hover { color: var(--accent); border-color: var(--accent); }
</style>
```

- [ ] **Step 8: Write writing/[slug].astro**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { publishedOnly, formatDate } from '../../lib/posts';
import { readingTime } from '../../lib/reading-time';
import '../../styles/prose.css';

export async function getStaticPaths() {
  const posts = publishedOnly(await getCollection('posts'));
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const minutes = readingTime(post.body ?? '');
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="wrap article">
    <aside class="meta muted">
      <time datetime={post.data.date.toISOString().slice(0, 10)}>{formatDate(post.data.date)}</time>
      <span>{minutes} minute read</span>
      {post.data.tags.length > 0 && (
        <ul role="list" class="tags">
          {post.data.tags.map((tag) => <li><a class="tag" href={`/writing/tag/${tag}`}>{tag}</a></li>)}
        </ul>
      )}
    </aside>
    <div class="body">
      <h1 class="title serif">{post.data.title}</h1>
      <p class="serif italic-light standfirst">{post.data.description}</p>
      <div class="prose"><Content /></div>
    </div>
  </article>
</BaseLayout>

<style>
  .article { display: grid; gap: 32px; padding-block: 48px 120px; }
  .meta { display: flex; flex-direction: column; gap: 10px; font-size: 15px; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .tag { display: inline-block; padding: 5px 12px; border: 1px solid var(--rule); border-radius: 999px; font-size: 13px; }
  .tag:hover { color: var(--accent); border-color: var(--accent); }
  .body { max-width: var(--measure); }
  .title { font-size: clamp(40px, 5vw, 64px); line-height: 1.02; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 20px; }
  .standfirst { font-size: clamp(22px, 2.2vw, 26px); line-height: 1.35; color: var(--accent); margin-bottom: 40px; }
  @media (min-width: 1000px) {
    .article { grid-template-columns: 200px var(--measure); gap: 80px; justify-content: center; padding-block: 96px 120px; }
    .meta { padding-top: 14px; }
  }
</style>
```

- [ ] **Step 9: Build and verify**

Run: `pnpm build && ls dist/writing && grep -c 'astro-code' dist/writing/a-new-site/index.html && grep -o 'minute read' dist/writing/a-new-site/index.html`
Expected: `a-new-site` directory and `index.html` listed; at least one `astro-code` block; `minute read` present. Preview the post: code block shows the gold/green/peach colors on the night ground in both themes.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: posts collection, Shiki theme, prose styles, writing index and post page"
```

---

### Task 6: Tag pages

**Files:**
- Create: `src/pages/writing/tag/[tag].astro`

**Interfaces:**
- Consumes: `publishedOnly`, `sortNewestFirst`, `allTags` (Task 4), `PostList` (Task 5).

- [ ] **Step 1: Write the page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import PostList from '../../../components/PostList.astro';
import { publishedOnly, sortNewestFirst, allTags } from '../../../lib/posts';

export async function getStaticPaths() {
  const posts = publishedOnly(await getCollection('posts'));
  return allTags(posts).map((tag) => ({
    params: { tag },
    props: { posts: sortNewestFirst(posts.filter((p) => p.data.tags.includes(tag))) },
  }));
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---
<BaseLayout title={`Writing about ${tag}`} description={`Posts tagged ${tag}.`}>
  <section class="wrap section">
    <div class="section-head">
      <h1 class="h2">Writing about {tag}</h1>
      <p class="muted"><a href="/writing">All posts</a></p>
    </div>
    <div class="list"><PostList posts={posts} /></div>
  </section>
</BaseLayout>

<style>
  .list { margin-top: 40px; }
  .section-head a { text-decoration: underline; text-underline-offset: 3px; }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build && ls dist/writing/tag`
Expected: `meta` directory (from the starter post's tag).

- [ ] **Step 3: Add a draft post to prove drafts are excluded**

Create `src/content/posts/draft-check.md`:
```md
---
title: "Draft check"
description: "Should never be built."
date: 2026-09-23
tags: [never]
draft: true
---
Not published.
```

Run: `pnpm build && ls dist/writing dist/writing/tag`
Expected: no `draft-check` directory and no `never` tag directory.

Then delete the file: `rm src/content/posts/draft-check.md`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: tag pages for writing"
```

---

### Task 7: Repo loader with cache fallback (TDD) and /open-source page

**Files:**
- Create: `src/lib/repos.ts`, `src/lib/repos-build.ts`, `src/data/repos.json`, `src/data/repos.cache.json`, `src/components/RepoList.astro`, `src/pages/open-source.astro`, `tests/repos.test.ts`

**Interfaces:**
- Produces from `repos.ts`:
  ```ts
  export type RepoEntry = { repo: string; blurb?: string };
  export type Repo = { repo: string; name: string; url: string; description: string | null; stars: number | null; language: string | null };
  export type RepoCache = Record<string, Repo>;
  export type LoadDeps = { fetchFn: typeof fetch; cache: RepoCache; token?: string; warn?: (msg: string) => void };
  export async function loadRepos(entries: RepoEntry[], deps: LoadDeps): Promise<{ repos: Repo[]; cache: RepoCache; failures: string[] }>;
  ```
- Produces from `repos-build.ts`: `getRepos(): Promise<Repo[]>` (memoized per build; reads `src/data/repos.json` and `repos.cache.json`, writes the cache on success).
- Produces: `RepoList` props `{ repos: Repo[]; limit?: number }`.

- [ ] **Step 1: Write the failing tests**

`tests/repos.test.ts`:
```ts
import { describe, it, expect, vi } from 'vitest';
import { loadRepos, type RepoCache } from '../src/lib/repos';

const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
const gh = (name: string, stars: number, description = 'desc') => ({
  full_name: `alexvcasillas/${name}`, name, html_url: `https://github.com/alexvcasillas/${name}`,
  description, stargazers_count: stars, language: 'TypeScript',
});

describe('loadRepos', () => {
  it('maps GitHub responses and preserves input order', async () => {
    const fetchFn = vi.fn(async (url: string | URL | Request) => {
      const name = String(url).split('/').pop()!;
      return ok(gh(name, name === 'a' ? 10 : 5));
    }) as unknown as typeof fetch;
    const { repos, failures } = await loadRepos(
      [{ repo: 'alexvcasillas/b' }, { repo: 'alexvcasillas/a' }],
      { fetchFn, cache: {} },
    );
    expect(repos.map((r) => r.name)).toEqual(['b', 'a']);
    expect(repos[1].stars).toBe(10);
    expect(repos[0].url).toBe('https://github.com/alexvcasillas/b');
    expect(failures).toEqual([]);
  });

  it('uses the blurb override in place of the GitHub description', async () => {
    const fetchFn = (async () => ok(gh('x', 1, 'from github'))) as unknown as typeof fetch;
    const { repos } = await loadRepos([{ repo: 'alexvcasillas/x', blurb: 'mine' }], { fetchFn, cache: {} });
    expect(repos[0].description).toBe('mine');
  });

  it('falls back to the cache when fetch throws', async () => {
    const cache: RepoCache = {
      'alexvcasillas/x': { repo: 'alexvcasillas/x', name: 'x', url: 'https://github.com/alexvcasillas/x', description: 'cached', stars: 42, language: 'TypeScript' },
    };
    const fetchFn = (async () => { throw new Error('offline'); }) as unknown as typeof fetch;
    const warn = vi.fn();
    const { repos, failures } = await loadRepos([{ repo: 'alexvcasillas/x' }], { fetchFn, cache, warn });
    expect(repos[0].stars).toBe(42);
    expect(failures).toEqual(['alexvcasillas/x']);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('falls back to the cache on a non-200 response', async () => {
    const cache: RepoCache = {
      'alexvcasillas/x': { repo: 'alexvcasillas/x', name: 'x', url: 'https://github.com/alexvcasillas/x', description: 'cached', stars: 7, language: null },
    };
    const fetchFn = (async () => new Response('rate limited', { status: 403 })) as unknown as typeof fetch;
    const { repos } = await loadRepos([{ repo: 'alexvcasillas/x' }], { fetchFn, cache });
    expect(repos[0].stars).toBe(7);
  });

  it('renders name and link with null stars when neither API nor cache has the repo', async () => {
    const fetchFn = (async () => { throw new Error('offline'); }) as unknown as typeof fetch;
    const { repos } = await loadRepos([{ repo: 'alexvcasillas/new' }], { fetchFn, cache: {} });
    expect(repos[0]).toEqual({
      repo: 'alexvcasillas/new', name: 'new', url: 'https://github.com/alexvcasillas/new',
      description: null, stars: null, language: null,
    });
  });

  it('returns an updated cache containing every successful fetch', async () => {
    const fetchFn = (async () => ok(gh('x', 3))) as unknown as typeof fetch;
    const { cache } = await loadRepos([{ repo: 'alexvcasillas/x' }], { fetchFn, cache: {} });
    expect(cache['alexvcasillas/x'].stars).toBe(3);
  });

  it('sends the token as a bearer header when provided', async () => {
    const fetchFn = vi.fn(async () => ok(gh('x', 1))) as unknown as typeof fetch;
    await loadRepos([{ repo: 'alexvcasillas/x' }], { fetchFn, cache: {}, token: 'abc' });
    const init = (fetchFn as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit;
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer abc');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL, cannot find module `../src/lib/repos`.

- [ ] **Step 3: Implement repos.ts**

```ts
export type RepoEntry = { repo: string; blurb?: string };
export type Repo = {
  repo: string;
  name: string;
  url: string;
  description: string | null;
  stars: number | null;
  language: string | null;
};
export type RepoCache = Record<string, Repo>;
export type LoadDeps = { fetchFn: typeof fetch; cache: RepoCache; token?: string; warn?: (msg: string) => void };

type GitHubRepo = {
  full_name: string; name: string; html_url: string;
  description: string | null; stargazers_count: number; language: string | null;
};

function bare(entry: RepoEntry): Repo {
  const name = entry.repo.split('/')[1] ?? entry.repo;
  return { repo: entry.repo, name, url: `https://github.com/${entry.repo}`, description: entry.blurb ?? null, stars: null, language: null };
}

async function fetchOne(entry: RepoEntry, deps: LoadDeps): Promise<Repo> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'alexvcasillas.com-build' };
  if (deps.token) headers.Authorization = `Bearer ${deps.token}`;
  const res = await deps.fetchFn(`https://api.github.com/repos/${entry.repo}`, { headers });
  if (!res.ok) throw new Error(`GitHub responded ${res.status} for ${entry.repo}`);
  const data = (await res.json()) as GitHubRepo;
  return {
    repo: entry.repo,
    name: data.name,
    url: data.html_url,
    description: entry.blurb ?? data.description,
    stars: data.stargazers_count,
    language: data.language,
  };
}

export async function loadRepos(entries: RepoEntry[], deps: LoadDeps) {
  const cache: RepoCache = { ...deps.cache };
  const failures: string[] = [];
  const warn = deps.warn ?? ((msg: string) => console.warn(msg));

  const repos = await Promise.all(
    entries.map(async (entry) => {
      try {
        const repo = await fetchOne(entry, deps);
        cache[entry.repo] = repo;
        return repo;
      } catch (err) {
        failures.push(entry.repo);
        warn(`[repos] ${entry.repo}: ${(err as Error).message}. Using cache.`);
        const cached = cache[entry.repo];
        return cached ? { ...cached, description: entry.blurb ?? cached.description } : bare(entry);
      }
    }),
  );

  return { repos, cache, failures };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: 14 passed (7 from earlier tasks, 7 here).

- [ ] **Step 5: Write repos.json and an initial repos.cache.json**

`src/data/repos.json`:
```json
[
  { "repo": "alexvcasillas/animated-styled-components" },
  { "repo": "alexvcasillas/react-mobx-state-tree" },
  { "repo": "alexvcasillas/react-mobx-router" },
  { "repo": "alexvcasillas/react-onboarding" },
  { "repo": "alexvcasillas/react-spring-pop" },
  { "repo": "alexvcasillas/memory-monitor", "blurb": "Watch memory usage in Node.js and catch leaks early." },
  { "repo": "alexvcasillas/react-native-loading-dots" },
  { "repo": "alexvcasillas/curl-runner" },
  { "repo": "alexvcasillas/cratebox" },
  { "repo": "alexvcasillas/graphdb" }
]
```

`src/data/repos.cache.json`: start with `{}`. The first successful build fills it.

- [ ] **Step 6: Write repos-build.ts**

```ts
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadRepos, type Repo, type RepoCache, type RepoEntry } from './repos';

const entriesPath = fileURLToPath(new URL('../data/repos.json', import.meta.url));
const cachePath = fileURLToPath(new URL('../data/repos.cache.json', import.meta.url));

let pending: Promise<Repo[]> | undefined;

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try { return JSON.parse(await readFile(path, 'utf8')) as T; } catch { return fallback; }
}

export function getRepos(): Promise<Repo[]> {
  pending ??= (async () => {
    const entries = await readJson<RepoEntry[]>(entriesPath, []);
    const cache = await readJson<RepoCache>(cachePath, {});
    const { repos, cache: next, failures } = await loadRepos(entries, {
      fetchFn: fetch,
      cache,
      token: process.env.GITHUB_TOKEN,
    });
    if (failures.length < entries.length) {
      await writeFile(cachePath, JSON.stringify(next, null, 2) + '\n');
    }
    return repos;
  })();
  return pending;
}
```

- [ ] **Step 7: Write RepoList.astro**

```astro
---
import type { Repo } from '../lib/repos';
interface Props { repos: Repo[]; limit?: number }
const { repos, limit } = Astro.props;
const shown = limit ? repos.slice(0, limit) : repos;
const fmt = new Intl.NumberFormat('en-US');
---
<ul role="list" class="repos">
  {shown.map((repo) => (
    <li class="row">
      <a href={repo.url} class="entry">
        <span class="serif name">{repo.name}</span>
        {repo.description && <span class="muted desc">{repo.description}</span>}
      </a>
      {repo.stars !== null && (
        <span class="stars" aria-label={`${fmt.format(repo.stars)} stars`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3 6.6 7 .8-5.2 4.8L18.2 22 12 18.4 5.8 22l1.4-7.8L2 9.4l7-.8z"/></svg>
          {fmt.format(repo.stars)}
        </span>
      )}
    </li>
  ))}
</ul>

<style>
  .repos { display: grid; gap: 0; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 24px; padding-block: 24px; border-top: 1px solid var(--rule); }
  .entry { display: flex; flex-direction: column; gap: 6px; }
  .name { font-size: clamp(21px, 2vw, 26px); line-height: 1.1; }
  .desc { font-size: 15px; }
  .stars { display: inline-flex; align-items: center; gap: 6px; font-size: 15px; color: var(--accent); white-space: nowrap; }
  @media (min-width: 900px) {
    .repos { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 80px; }
    .row { padding-block: 26px; }
  }
  .row:nth-last-child(-n + 1) { border-bottom: 1px solid var(--rule); }
  @media (min-width: 900px) { .row:nth-last-child(-n + 2) { border-bottom: 1px solid var(--rule); } }
</style>
```

- [ ] **Step 8: Write open-source.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import RepoList from '../components/RepoList.astro';
import { getRepos } from '../lib/repos-build';
const repos = await getRepos();
---
<BaseLayout title="Open source" description="Libraries I keep around, mostly for React and Node." class="on-night">
  <section class="wrap section">
    <div class="section-head">
      <h1 class="h2">Open source</h1>
      <p class="muted">Libraries I keep around, mostly for React and Node.</p>
    </div>
    <div class="list"><RepoList repos={repos} /></div>
    <a class="link-arrow more" href="https://github.com/alexvcasillas">
      Everything on GitHub
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
    </a>
  </section>
</BaseLayout>

<style>
  .list { margin-block: 40px; }
</style>
```

- [ ] **Step 9: Build online, then offline**

Run: `pnpm build && cat src/data/repos.cache.json | head -20`
Expected: build succeeds; cache now holds ten entries with star counts.

Run offline (simulate by pointing the API at nowhere): `GITHUB_API_UNREACHABLE=1 pnpm build` is not a real switch, so instead: temporarily disable networking (macOS: turn Wi-Fi off) and run `pnpm build`.
Expected: build succeeds, warnings `[repos] ...: fetch failed. Using cache.` are printed, and `dist/open-source/index.html` still shows star counts from the cache. Turn networking back on.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: GitHub repo loader with cache fallback and /open-source page"
```

---

### Task 8: Home page composition

**Files:**
- Create: `src/components/Hero.astro`, `src/components/SectionHeading.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `AppBand` (Task 3), `RepoList` + `getRepos` (Task 7), `PostList` + posts helpers (Tasks 4–5), `links.json` (Task 2).
- Produces: `SectionHeading` props `{ id?: string; title: string; intro?: string; level?: 'h1' | 'h2' }`.

- [ ] **Step 1: Write SectionHeading.astro**

```astro
---
interface Props { id?: string; title: string; intro?: string; level?: 'h1' | 'h2' }
const { id, title, intro, level = 'h2' } = Astro.props;
const Tag = level;
---
<div class="section-head" id={id}>
  <Tag class="h2">{title}</Tag>
  {intro && <p class="muted">{intro}</p>}
</div>
```

- [ ] **Step 2: Write Hero.astro**

```astro
---
import links from '../data/links.json';
const appStore = links.find((l) => l.label === 'App Store')!;
const github = links.find((l) => l.label === 'GitHub')!;
---
<header class="wrap hero">
  <h1 class="h1">
    I make small, quiet software.<br />
    <span class="italic-light accent">For the web, and for your pocket.</span>
  </h1>
  <p class="lede">
    Engineer at Tiptap, working on the editor a lot of the web writes in. Evenings go to open-source libraries and little iOS games that never rush you. Written from Córdoba, Spain.
  </p>
  <div class="actions">
    <a class="pill" href={github.href}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
      GitHub
    </a>
    <a class="link-arrow plain" href={appStore.href}>
      App Store
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
    </a>
  </div>
</header>

<style>
  .hero { display: flex; flex-direction: column; gap: 32px; padding-block: clamp(56px, 10vw, 140px) clamp(64px, 9vw, 128px); }
  .h1 { max-width: 1000px; }
  .accent { color: var(--accent); }
  .actions { display: flex; flex-wrap: wrap; gap: 28px; align-items: center; }
  .plain { color: var(--ink); font-weight: 500; }
  .plain:hover { color: var(--accent); }
</style>
```

The hero paragraph is spec section 11 open copy. Keep it exactly as written here; Alex edits it later.

- [ ] **Step 3: Rewrite index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import SectionHeading from '../components/SectionHeading.astro';
import AppBand from '../components/AppBand.astro';
import RepoList from '../components/RepoList.astro';
import PostList from '../components/PostList.astro';
import apps from '../data/apps.json';
import { getRepos } from '../lib/repos-build';
import { publishedOnly, sortNewestFirst } from '../lib/posts';
import { SITE } from '../lib/site';

const sortedApps = [...apps].sort((a, b) => a.order - b.order);
const repos = await getRepos();
const posts = sortNewestFirst(publishedOnly(await getCollection('posts'))).slice(0, 3);
const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
---
<BaseLayout title={SITE.name}>
  <Hero />

  <section class="wrap apps-intro" aria-labelledby="apps">
    <SectionHeading id="apps" title="Four little games for iPhone and iPad." intro="No timers, no ads, no accounts. They play offline and they are free. Morning to night, top to bottom." />
  </section>
  {sortedApps.map((app, i) => <AppBand app={app} index={i} />)}

  <div class="on-night">
    <section class="wrap section" aria-labelledby="oss">
      <SectionHeading id="oss" title="Open source" intro="Libraries I keep around, mostly for React and Node." />
      <div class="list"><RepoList repos={repos} limit={6} /></div>
      <a class="link-arrow" href="/open-source">Everything on GitHub <Fragment set:html={arrow} /></a>
    </section>

    <section class="wrap section writing" aria-labelledby="writing">
      <SectionHeading id="writing" title="Writing" intro="Notes on JavaScript, Node, memory, SwiftUI, and whatever else caught my attention that week." />
      <div class="list"><PostList posts={posts} /></div>
      <a class="link-arrow" href="/writing">All posts <Fragment set:html={arrow} /></a>
    </section>
  </div>
</BaseLayout>

<style>
  .apps-intro { padding-block: 40px 56px; }
  .list { margin-block: 40px; }
  .writing { padding-top: 0; }
</style>
```

- [ ] **Step 4: Build and review against the canvas**

Run: `pnpm build && pnpm preview`
Check at 1440px against the "Home, desktop" artboard: hero, intro row, four alternating bands paper→night, open source two columns, writing list, footer. Check at 390px against "Home, phone": everything stacks, no horizontal scroll. Toggle theme: page ground switches; bands and night sections do not.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: home page with hero, app bands, open source, and latest writing"
```

---

### Task 9: About page

**Files:**
- Create: `src/data/now.json`, `src/pages/about.astro`

**Interfaces:**
- Consumes: `links.json` (Task 2).
- Produces: `now.json` shape `Array<{ label: string; value: string }>`.

- [ ] **Step 1: Write now.json**

```json
[
  { "label": "Building", "value": "[the next little game, or whatever is on the bench]" },
  { "label": "Reading", "value": "[a book title]" },
  { "label": "Listening to", "value": "[an album or artist]" }
]
```

The bracketed values are intentional placeholders for Alex to replace; they must remain visible in the build so they are not forgotten.

- [ ] **Step 2: Write about.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import links from '../data/links.json';
import now from '../data/now.json';
---
<BaseLayout title="About" description="Alex Casillas, software engineer in Córdoba, Spain. Small, quiet software for the web and for your pocket.">
  <div class="wrap about">
    <div class="copy">
      <h1 class="h1 about-h1">
        Hi, I'm Alex.<br />
        <span class="italic-light accent">I live in Córdoba, Spain.</span>
      </h1>
      <p>I'm a software engineer at Tiptap, where I work on the editor a lot of the web writes in. I'm self-taught, and most of what I know came from shipping things: SaaS products, React and React Native apps, a few Unity games, and lately small iOS games built in SwiftUI.</p>
      <p>Evenings go to open source and to the four little games on this site. I like software that stays out of the way. No timers, no ads, no accounts, nothing that asks for more of your attention than it needs.</p>
      <p>Away from the keyboard I sing more than I should, try to keep up with the gym, lose most of that ground to pizza, and share a home with two cats who review all my code.</p>
      <p>I've always wanted to see more of the world. This site is where I'll write about what I'm building and, now and then, about where I've been.</p>

      <section class="now" aria-labelledby="now">
        <h2 id="now" class="serif">Right now</h2>
        <dl>
          {now.map((item) => (
            <div class="pair"><dt class="muted">{item.label}</dt><dd>{item.value}</dd></div>
          ))}
        </dl>
      </section>
    </div>

    <aside class="side">
      <img src="/images/portrait.jpg" alt="Alex smiling in front of an iron railing, with hills and farmland behind" width="400" height="480" loading="lazy" />
      <section aria-labelledby="elsewhere">
        <h2 id="elsewhere" class="serif">Elsewhere</h2>
        <ul role="list" class="hairline-list">
          {links.map((l) => (
            <li><a href={l.href}><span>{l.label}</span><span class="muted note">{l.note}</span></a></li>
          ))}
        </ul>
      </section>
    </aside>
  </div>
</BaseLayout>

<style>
  .about { display: grid; gap: 56px; padding-block: 48px 120px; }
  .about-h1 { font-size: clamp(44px, 6vw, 80px); margin-bottom: 8px; }
  .accent { color: var(--accent); }
  .copy { display: flex; flex-direction: column; gap: 28px; max-width: 640px; font-size: 19px; line-height: 1.65; }
  .now { margin-top: 24px; border-top: 1px solid var(--rule); }
  .now h2 { margin: 28px 0 12px; font-size: 32px; font-weight: 400; letter-spacing: -0.015em; }
  dl { margin: 0; display: grid; gap: 12px; font-size: 17px; }
  .pair { display: grid; grid-template-columns: 140px 1fr; gap: 24px; }
  dd { margin: 0; }
  .side { display: flex; flex-direction: column; gap: 40px; }
  .side img { width: min(400px, 100%); height: auto; aspect-ratio: 5 / 6; object-fit: cover; border-radius: 28px; transform: rotate(2deg); box-shadow: 0 30px 60px rgba(0,0,0,0.15); }
  .side h2 { font-size: 26px; font-weight: 400; margin-bottom: 12px; }
  .side li a { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-block: 14px; font-weight: 500; }
  .note { font-weight: 400; font-size: 15px; }
  @media (min-width: 1000px) {
    .about { grid-template-columns: 640px 420px; justify-content: space-between; align-items: start; gap: 120px; padding-block: 96px 120px; }
    .side { padding-top: 16px; }
  }
</style>
```

- [ ] **Step 3: Build and verify**

Run: `pnpm build && grep -c 'Right now' dist/about/index.html && grep -c 'mailto:' dist/about/index.html dist/index.html`
Expected: `1` for "Right now"; `0` mailto matches in both files (grep exits non-zero on zero matches, which is the desired result here).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: about page with portrait, right-now list, and elsewhere links"
```

---

### Task 10: RSS feed and 404 page

**Files:**
- Create: `src/pages/rss.xml.ts`, `src/pages/404.astro`

**Interfaces:**
- Consumes: posts helpers (Task 4), `SITE` (Task 1).

- [ ] **Step 1: Write rss.xml.ts**

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { publishedOnly, sortNewestFirst } from '../lib/posts';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = sortNewestFirst(publishedOnly(await getCollection('posts')));
  return rss({
    title: `${SITE.name}, writing`,
    description: SITE.description,
    site: context.site!,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/writing/${post.id}`,
      categories: post.data.tags,
    })),
  });
}
```

- [ ] **Step 2: Write 404.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Not found" description="That page is not here.">
  <section class="wrap section notfound">
    <h1 class="h2">That page is not here.</h1>
    <p class="muted">It may have moved when the site was rebuilt.</p>
    <a class="pill" href="/">Back to the start</a>
  </section>
</BaseLayout>

<style>
  .notfound { display: flex; flex-direction: column; gap: 24px; align-items: flex-start; min-height: 50vh; }
</style>
```

- [ ] **Step 3: Build and verify**

Run: `pnpm build && head -c 600 dist/rss.xml && echo && ls dist/404.html dist/sitemap-index.xml && grep -c 'writing/a-new-site' dist/sitemap-0.xml`
Expected: RSS XML with one `<item>`; `404.html` and sitemap files exist; the post URL appears in the sitemap.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: RSS feed and 404 page"
```

---

### Task 11: Open Graph image, HTML validation, link check, README

**Files:**
- Create: `scripts/og.mjs`, `scripts/check-links.mjs`, `public/og.png`, `.htmlvalidate.json`
- Modify: `README.md`

- [ ] **Step 1: Write scripts/og.mjs**

```js
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F6F2E8"/>
  <rect x="0" y="470" width="1200" height="160" fill="#0C1B24"/>
  <text x="96" y="230" font-family="Georgia, serif" font-size="92" fill="#1F2A26" letter-spacing="-2">I make small, quiet software.</text>
  <text x="96" y="330" font-family="Georgia, serif" font-size="72" font-style="italic" fill="#2F5D4A" letter-spacing="-1">For the web, and for your pocket.</text>
  <text x="96" y="560" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#F3E9D6">Alex Casillas</text>
  <text x="1104" y="560" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#E9B85C">alexvcasillas.com</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png');
```

Run: `pnpm og && file public/og.png`
Expected: `PNG image data, 1200 x 630`.

Note: sharp renders SVG text with system fonts, so the OG image uses Georgia rather than Newsreader. This is acceptable for the first release; per-post OG images are out of scope per spec section 12.

- [ ] **Step 2: Write .htmlvalidate.json**

```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "no-inline-style": "off",
    "no-trailing-whitespace": "off",
    "long-title": "off",
    "require-sri": "off",
    "wcag/h30": "off"
  }
}
```

Run: `pnpm build && pnpm exec html-validate "dist/**/*.html"`
Expected: no errors. If a rule fires on Astro-generated markup that is valid HTML (for example `attribute-boolean-style`), fix the source if it is our markup; add the rule to the `rules` block with `"off"` only if it is generated by Astro and harmless, and note it in the task report.

- [ ] **Step 3: Write scripts/check-links.mjs**

```js
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const root = resolve('dist');
const pages = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (entry.name.endsWith('.html')) pages.push(p);
  }
}
await walk(root);

async function exists(p) { try { await stat(p); return true; } catch { return false; } }
async function resolvable(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true;
  const candidates = [
    join(root, clean),
    join(root, clean, 'index.html'),
    join(root, clean + '.html'),
  ];
  for (const c of candidates) if (await exists(c)) return true;
  return false;
}

let broken = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue;
    const target = href.startsWith('/') ? href : join(dirname(page).replace(root, ''), href);
    if (!(await resolvable(target))) {
      broken++;
      console.error(`${page.replace(root, '')}: broken link ${href}`);
    }
  }
}
if (broken) { console.error(`${broken} broken internal link(s)`); process.exit(1); }
console.log(`checked ${pages.length} pages, no broken internal links`);
```

Run: `pnpm build && pnpm validate`
Expected: html-validate passes, link check prints `no broken internal links`.

- [ ] **Step 4: Type check**

Run: `pnpm check`
Expected: 0 errors. Fix any reported type errors in `.astro` frontmatter (common: `Astro.props` typing in `[slug].astro`, add `import type { InferGetStaticPropsType } from 'astro'` and `type Props = InferGetStaticPropsType<typeof getStaticPaths>` if needed).

- [ ] **Step 5: Lighthouse pass**

Run: `pnpm build && pnpm preview` then in Chrome DevTools run Lighthouse on `/`, `/writing/a-new-site`, and `/about` in mobile mode.
Expected: Performance, Accessibility, Best Practices, SEO each ≥ 95. If Accessibility flags contrast on an app band, darken that band's `text` or `accent` in `apps.json` until it passes and note the change.

- [ ] **Step 6: Rewrite README.md**

```md
# alexvcasillas.com

Personal site: four iOS games, curated open-source repos, and a markdown blog. Built with Astro, output is static HTML in `dist/`.

## Develop

    pnpm install
    pnpm dev

## Write a post

Add `src/content/posts/<slug>.md`:

    ---
    title: "Post title"
    description: "One sentence shown in lists and in the feed."
    date: 2026-09-23
    tags: [node]
    draft: false
    ---

Set `draft: true` to keep it out of the build, the feed, and the sitemap. Reading time is computed from the body.

## Edit content

- Apps: `src/data/apps.json` and the assets under `public/apps/<slug>/`.
- Repos: `src/data/repos.json` (order matters; `blurb` overrides the GitHub description). Stars are fetched at build and cached in `src/data/repos.cache.json`, which is committed so offline builds still work. Set `GITHUB_TOKEN` in the build environment to raise the API rate limit.
- About page "Right now": `src/data/now.json`.
- Footer and Elsewhere links: `src/data/links.json`.
- Hero and bio copy live in `src/components/Hero.astro` and `src/pages/about.astro`.

## Check

    pnpm test        # unit tests
    pnpm check       # astro type check
    pnpm build
    pnpm validate    # html-validate + internal link check
    pnpm og          # regenerate public/og.png
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: OG image, HTML validation, link check, and README"
```

---

## Self-review notes

- Spec §4 site map: every route has a task (1–2 home shell, 3 apps, 5 writing + post, 6 tags, 7 open-source, 8 home, 9 about, 10 rss + 404; sitemap via integration in Task 1).
- Spec §5 tokens and type: Task 2. Theme toggle with no-flash inline script: Task 2 step 7. Motion: none; reduced-motion guard in global.css.
- Spec §6 content model: posts schema Task 5, apps Task 3, now.json Task 9, repos + cache + failure handling Task 7 (tests cover throw, non-200, missing cache, token header, cache update).
- Spec §7 components: all present; `Prose` became `prose.css` applied on a `div.prose`, which serves the same purpose with one less component.
- Spec §9 accessibility: skip link, focus ring, landmarks, `aria-current`, `aria-labelledby`, alt text, `aria-hidden` icons in Tasks 2–9; contrast check in Task 11 step 5.
- Spec §10 testing: Vitest (Tasks 4, 7), `astro check` (Task 11), html-validate and link check (Task 11), offline build (Task 7 step 9), manual browser pass (Tasks 2, 3, 8, 11).
- Type names are consistent: `Repo`, `RepoEntry`, `RepoCache`, `LoadDeps`, `loadRepos`, `getRepos`; `publishedOnly`, `sortNewestFirst`, `allTags`, `formatDate`, `readingTime`.
