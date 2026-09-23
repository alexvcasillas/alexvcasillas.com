import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import entriesJson from '../data/repos.json';
import cacheJson from '../data/repos.cache.json';
import { loadRepos, type Repo, type RepoCache, type RepoEntry } from './repos';

// Entries and the cache are imported so Vite bundles them: reads never depend
// on the working directory, and a bad path fails the build. The cache is
// written back through the filesystem, resolved from the project root, where
// `astro build` and `astro dev` run. A failed write only warns.
const entries: RepoEntry[] = entriesJson;
const cache: RepoCache = cacheJson as RepoCache;
const cachePath = resolve(process.cwd(), 'src/data/repos.cache.json');

let pending: Promise<Repo[]> | undefined;

function serialize(cache: RepoCache): string {
  const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
  return JSON.stringify(sorted, null, 2) + '\n';
}

export function getRepos(): Promise<Repo[]> {
  pending ??= (async () => {
    const { repos, cache: next, failures } = await loadRepos(entries, {
      fetchFn: fetch,
      cache,
      token: process.env.GITHUB_TOKEN,
    });
    for (const repo of repos) {
      if (repo.stars === null) console.warn(`[repos] ${repo.repo}: no data from GitHub or cache`);
    }
    if (failures.length < entries.length) {
      const serialized = serialize(next);
      if (serialized !== serialize(cache)) {
        try {
          await writeFile(cachePath, serialized);
        } catch (err) {
          console.warn(`[repos] could not write cache: ${(err as Error).message}`);
        }
      }
    }
    return repos;
  })();
  return pending;
}
