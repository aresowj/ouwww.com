import fs from 'node:fs'; import { XMLParser } from 'fast-xml-parser';
const urls=new XMLParser().parse(fs.readFileSync('post-sitemap.xml','utf8')).urlset.url.map(x=>x.loc).filter(x=>x!=='/');
const missing=urls.filter(x=>!fs.existsSync(`dist${x}index.html`));
const taxonomyUrls=['category-sitemap.xml','post_tag-sitemap.xml'].flatMap(file=>new XMLParser().parse(fs.readFileSync(file,'utf8')).urlset.url.map(x=>x.loc));
const missingTaxonomy=taxonomyUrls.filter(x=>!fs.existsSync(`dist${x}index.html`));
const required=['dist/index.html','dist/404.html','dist/feed/index.xml','dist/feed/index.html','dist/rss.xml','dist/sitemap.xml','dist/sitemap_index.xml','dist/post-sitemap.xml','dist/category-sitemap.xml','dist/post_tag-sitemap.xml','dist/privacy-policy/index.html'];
const missingRequired=required.filter(x=>!fs.existsSync(x));
const checks=[...missing.map(x=>`route ${x}`),...missingTaxonomy.map(x=>`taxonomy ${x}`),...missingRequired.map(x=>`artifact ${x}`)];
if(checks.length){console.error('Missing:',checks);process.exit(1)}
const home=fs.readFileSync('dist/index.html','utf8'); const article=fs.readFileSync(`dist${urls[0]}index.html`,'utf8');
if(!home.includes('https://ouwww.com') || !article.includes('rel="canonical"') || !article.includes('property="og:title"')){console.error('SEO metadata missing');process.exit(1)}
console.log(`Verified ${urls.length} legacy post routes, ${taxonomyUrls.length} taxonomy routes, feeds, sitemap artifacts, 404, and SEO metadata.`);
