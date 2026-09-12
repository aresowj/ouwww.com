# Publishing workflow

This is an Astro static site published by Cloudflare Pages. To publish an article, add one Markdown file under `src/content/blog/` with `title`, `description`, `date`, `year`, `month`, `day`, `routeSlug`, and `categories` frontmatter. `routeSlug` is used because Astro reserves the `slug` field. Keep the dated path fields unchanged for existing posts.

Run `npm install`, `npm run build`, and `npm test` before opening a pull request. The route verification test compares generated post and taxonomy paths against `tests/route-manifest.json` and verifies the Wrangler Pages output directory. Cloudflare Pages Git integration should use build command `npm run build` and output directory `dist`; `wrangler.toml` records the same output directory for Wrangler deployments. Do not change DNS or Cloudflare settings as part of content work. Put new media under `public/images/`; preserve `/wp-content/uploads/` URLs only when referencing existing media.
