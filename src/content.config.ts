import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    lang: z.enum(['tr', 'en']).default('en'),
    originalUrl: z.string().optional(),
    translation: z.string().optional(), // slug of the same post in the other language
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
