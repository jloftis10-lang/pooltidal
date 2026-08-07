import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cluster: z.enum(['Pool Maintenance', 'Pool Equipment', 'Pool Problems', 'San Diego Pool Care']),
    // Slug of the related service in src/lib/services.ts, for the
    // compact post -> service CTA. Optional so a post can omit it.
    relatedService: z.string().optional(),
  }),
});

export const collections = { blog };
