import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import fs from 'fs';
import path from 'path';

try {
  const destDir = path.resolve('./public/images/projects');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const sourceDir = '/home/arukast/.gemini/antigravity-ide/brain/0392e9a4-b79e-4e97-8502-49f71aa94fcf';
  const filesToCopy = [
    { src: 'api_queue_1784088173890.png', dest: 'api_queue.png' },
    { src: 'debian_hardening_1784088190436.png', dest: 'debian_hardening.png' },
    { src: 'ingress_tunnel_1784088206816.png', dest: 'ingress_tunnel.png' }
  ];
  for (const file of filesToCopy) {
    const srcPath = path.join(sourceDir, file.src);
    const destPath = path.join(destDir, file.dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
} catch (e) {
  console.error("Failed to copy project images:", e);
}

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['PRODUCTION', 'ONLINE', 'BLUEPRINT', 'STABLE']),
    category: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    architecture: z.array(z.string()).optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional()
  })
});

export const collections = { projects };
