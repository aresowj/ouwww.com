import { defineCollection, z } from 'astro:content';
const blog = defineCollection({ schema: z.object({ title: z.string(), description: z.string(), date: z.coerce.date(), year: z.string(), month: z.string(), day: z.string(), routeSlug: z.string(), categories: z.array(z.string()), cover: z.string().optional(), coverAlt: z.string().optional(), toc: z.boolean().optional() }) });
export const collections = { blog };
