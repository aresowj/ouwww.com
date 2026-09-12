import { getCollection } from 'astro:content';
import { urlset, xmlResponse } from '../lib/sitemap.js';

export async function GET() {
  const posts = await getCollection('blog');
  const categories = [...new Set(posts.map(({ data }) => data.categories[0].toLowerCase()))];
  return xmlResponse(urlset(categories.map((category) => ({ loc: `/category/${category}/` }))));
}
