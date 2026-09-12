import { getCollection } from 'astro:content';
import { urlset, xmlResponse } from '../lib/sitemap.js';

export async function GET() {
  const posts = await getCollection('blog');
  return xmlResponse(urlset(posts.map(({ data }) => ({ loc: `/${data.year}/${data.month}/${data.day}/${data.routeSlug}/`, lastmod: data.date.toISOString() }))));
}
