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
