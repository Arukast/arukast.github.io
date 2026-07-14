import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['PRODUCTION', 'ONLINE', 'BLUEPRINT', 'STABLE']),
    category: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string().url(),
    architecture: z.array(z.string()).optional(),
    icon: z.string().optional()
  })
});

export const collections = { projects };
