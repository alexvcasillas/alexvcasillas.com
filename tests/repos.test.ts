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
