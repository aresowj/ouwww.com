# Publishing workflow

This is an Astro static site published by Cloudflare Pages. To publish an article, add one Markdown file under `src/content/blog/` with `title`, `date`, `year`, `month`, `day`, `slug`, and `categories` frontmatter. Keep the dated path fields unchanged for existing posts.

Run `npm install`, `npm run build`, and `npm test` before opening a pull request. The route verification test compares generated post paths against the legacy `post-sitemap.xml`. Do not change DNS or Cloudflare settings as part of content work. Preserve `/wp-content/uploads/` URLs when referencing existing media.
