const escapeXml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export const urlset = (entries) => `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(({ loc, lastmod }) => `<url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</url>`).join('')}</urlset>`;
export const sitemapIndex = (files) => `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${files.map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`).join('')}</sitemapindex>`;
export const xmlResponse = (body) => new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
