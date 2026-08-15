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
    // Opt in only when the article naturally signals remodel/project intent.
    poolSavrSource: z.enum([
      'blog_variable_speed_pumps',
      'blog_saltwater_vs_chlorine',
    ]).optional(),
  }),
});

// Real before/after job write-ups — see src/pages/projects/[slug].astro.
// Empty on purpose (no .md files in src/content/projects/ yet): zero real
// jobs have been documented, so getStaticPaths() generates zero pages.
// NEVER add a fabricated/example entry here to "fill out" the site — add a
// real one when the business has real before/after photos and a real job
// to describe. See IMAGE-GUIDE.md for photo conventions.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // e.g. "Green Pool Recovery in Encinitas"
      location: z.string(), // city or neighborhood — never a street address
      service: z.string(), // a slug from src/lib/services.ts
      problem: z.string(),
      findings: z.string(), // what Pool Tidal found on inspection
      workPerformed: z.string(),
      result: z.string(),
      beforeImage: image().optional(),
      afterImage: image().optional(),
      publishDate: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects };
