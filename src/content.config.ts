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
    githubUrl: z.preprocess((val) => val === '' ? undefined : val, z.string().url().optional()),
    liveUrl: z.preprocess((val) => val === '' ? undefined : val, z.string().url().optional()),
    architecture: z.array(z.string()).optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    featured: z.preprocess((val) => val === null || val === '' ? undefined : val, z.boolean().optional()),
    order: z.preprocess((val) => val === null || val === '' ? undefined : val, z.number().optional())
  })
});

export const collections = { projects };
