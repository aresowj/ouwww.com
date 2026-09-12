import { getCollection } from 'astro:content';
import { urlset, xmlResponse } from '../lib/sitemap.js';

export async function GET() {
  const posts = await getCollection('blog');
  const tags = [...new Set(posts.flatMap(({ data }) => data.categories.slice(1).map((tag) => tag.toLowerCase().replaceAll(' ', '-'))))];
  return xmlResponse(urlset(tags.map((tag) => ({ loc: `/tag/${tag}/` }))));
}
