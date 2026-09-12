import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('tests/fixtures/route-manifest.json', 'utf8'));
const urls = manifest.posts;
const missing = urls.filter((url) => !fs.existsSync(`dist${url}index.html`));
const taxonomyUrls = [...manifest.categories, ...manifest.tags.map((tag) => `/tag/${tag}/`)];
const missingTaxonomy = taxonomyUrls.filter((url) => !fs.existsSync(`dist${url}index.html`));
const required = [
  'dist/index.html',
  'dist/404.html',
  'dist/feed/index.xml',
  'dist/feed/index.html',
  'dist/rss.xml',
  'dist/sitemap.xml',
  'dist/sitemap_index.xml',
  'dist/post-sitemap.xml',
  'dist/page-sitemap.xml',
  'dist/category-sitemap.xml',
  'dist/post_tag-sitemap.xml',
  'dist/privacy-policy/index.html',
  'dist/_redirects',
];
const missingRequired = required.filter((file) => !fs.existsSync(file));
const wrangler = fs.readFileSync('wrangler.toml', 'utf8');

if (!/pages_build_output_dir\s*=\s*["']\.\/dist["']/.test(wrangler)) {
  missingRequired.push('wrangler.toml pages_build_output_dir = "./dist"');
}

const checks = [
  ...missing.map((url) => `route ${url}`),
  ...missingTaxonomy.map((url) => `taxonomy ${url}`),
  ...missingRequired.map((file) => `artifact ${file}`),
];

if (checks.length) {
  console.error('Missing:', checks);
  process.exit(1);
}

const sitemapText = [
  'post-sitemap.xml',
  'page-sitemap.xml',
  'category-sitemap.xml',
  'post_tag-sitemap.xml',
  'sitemap.xml',
  'sitemap_index.xml',
].map((file) => fs.readFileSync(`dist/${file}`, 'utf8')).join('\n');
const missingSitemapLocs = [
  ...urls,
  ...manifest.categories,
  ...manifest.tags.map((tag) => `/tag/${tag}/`),
].filter((loc) => !sitemapText.includes(`<loc>${loc}</loc>`));

if (missingSitemapLocs.length) {
  console.error('Missing sitemap locs:', missingSitemapLocs);
  process.exit(1);
}

const home = fs.readFileSync('dist/index.html', 'utf8');
const article = fs.readFileSync(`dist${urls[0]}index.html`, 'utf8');
const coverArticle = fs.readFileSync(`dist${urls[1]}index.html`, 'utf8');
if (!home.includes('https://ouwww.com') || !article.includes('rel="canonical"') || !article.includes('property="og:title"')) {
  console.error('SEO metadata missing');
  process.exit(1);
}
if (!article.includes('https://www.googletagmanager.com/gtag/js?id=G-2DKJ0LTKTJ') || !article.includes('gtag(\"set\", \"linker\", {\"domains\": [\"aresou.net\"]})') || !article.includes('gtag(\"set\", \"developer_id.dZTNiMT\", true)') || !article.includes('gtag(\"config\", \"G-2DKJ0LTKTJ\")')) {
  console.error('Google Analytics metadata missing');
  process.exit(1);
}
const coverUrls = [
  '/images/covers/compile-install-python-centos.jpg',
  '/images/covers/javascript-notes.png',
  '/images/covers/how-to-draw-an-owl.jpg',
  '/images/covers/discord-logo.png',
  '/images/covers/apache-403-screenshot.jpg',
];
const redirects = fs.readFileSync('dist/_redirects', 'utf8');
if (coverUrls.some((url) => !home.includes(`src="${url}"`)) || !coverArticle.includes('property="og:image"') || !redirects.includes('/wp-content/uploads/2019/10/0_E6ucXqEIUfT12iuW.jpg /images/covers/compile-install-python-centos.jpg 301')) {
  console.error('Post cover images missing');
  process.exit(1);
}

console.log(`Verified ${urls.length} post routes, ${taxonomyUrls.length} taxonomy routes, feeds, sitemap artifacts, 404, and SEO metadata.`);
