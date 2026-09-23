import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string().regex(/^[a-z0-9-]+$/, 'tags must be lowercase, digits and hyphens only')).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
