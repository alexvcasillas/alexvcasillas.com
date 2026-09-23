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

Set `draft: true` to keep it out of the build, the feed, and the sitemap. Reading time is computed from the body. Tags must be lowercase letters, digits and hyphens (`react-native`, not `React Native`); anything else fails the build.

## Edit content

- Apps: `src/data/apps.json` and the assets under `public/apps/<slug>/`.
- Repos: `src/data/repos.json` (order matters; `blurb` overrides the GitHub description). Stars are fetched at build and cached in `src/data/repos.cache.json`, which is committed so offline builds still work. Set `GITHUB_TOKEN` in the build environment to raise the API rate limit.
- About page "Right now": `src/data/now.json`. Items whose `value` starts with `[` are placeholders and are hidden; the section is hidden until at least one item is filled in.
- Footer and Elsewhere links: `src/data/links.json`.
- Hero and bio copy live in `src/components/Hero.astro` and `src/pages/about.astro`.

Run builds from the repo root. A successful online build may update `src/data/repos.cache.json` with fresh star counts; commit it.

## Deploy

`pnpm build` outputs static files to `dist/`. Pages are written as `about.html`-style files and URLs have no trailing slashes, so any static host that serves `/about` from `about.html` works.

## Check

    pnpm test        # unit tests
    pnpm check       # astro type check
    pnpm build
    pnpm validate    # html-validate + internal link check
    pnpm og          # regenerate public/og.png
