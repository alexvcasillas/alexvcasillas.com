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
  const res = await deps.fetchFn(`https://api.github.com/repos/${entry.repo}`, { headers, signal: AbortSignal.timeout(8000) });
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
