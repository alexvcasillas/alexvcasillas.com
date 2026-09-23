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
