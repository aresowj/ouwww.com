import { urlset, xmlResponse } from '../lib/sitemap.js';

export function GET() {
  return xmlResponse(urlset([{ loc: '/' }, { loc: '/privacy-policy/' }]));
}
