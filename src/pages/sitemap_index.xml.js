import { sitemapIndex, xmlResponse } from '../lib/sitemap.js';

export function GET() {
  return xmlResponse(sitemapIndex(['/post-sitemap.xml', '/page-sitemap.xml', '/category-sitemap.xml', '/post_tag-sitemap.xml']));
}
