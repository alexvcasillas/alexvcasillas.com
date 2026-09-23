import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import entriesJson from '../data/repos.json';
import { loadRepos, type Repo, type RepoCache, type RepoEntry } from './repos';

// Entries are imported so Vite bundles them and a bad path fails the build.
// The cache is read and written through the filesystem. import.meta.url
// points into the bundled chunk at build time, so the path resolves from the
// project root, where `astro build` and `astro dev` run.
const entries: RepoEntry[] = entriesJson;
const cachePath = resolve(process.cwd(), 'src/data/repos.cache.json');

let pending: Promise<Repo[]> | undefined;

function serialize(cache: RepoCache): string {
  const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
  return JSON.stringify(sorted, null, 2) + '\n';
}

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try { return JSON.parse(await readFile(path, 'utf8')) as T; } catch { return fallback; }
}

export function getRepos(): Promise<Repo[]> {
  pending ??= (async () => {
    const cache = await readJson<RepoCache>(cachePath, {});
    const { repos, cache: next, failures } = await loadRepos(entries, {
      fetchFn: fetch,
      cache,
      token: process.env.GITHUB_TOKEN,
    });
    if (failures.length < entries.length) {
      const serialized = serialize(next);
      if (serialized !== serialize(cache)) await writeFile(cachePath, serialized);
    }
    return repos;
  })();
  return pending;
}
