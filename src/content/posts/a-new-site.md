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
