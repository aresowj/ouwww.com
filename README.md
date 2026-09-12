# weijie ou's scratch pad

The personal blog at [ouwww.com](https://ouwww.com), built with Astro and published on Cloudflare Pages.

## Local development

```bash
npm install
npm run dev
```

Before publishing, run:

```bash
npm run build
npm test
```

## Publishing a post

Add a Markdown file under `src/content/blog/` with `title`, `description`, `date`, `year`, `month`, `day`, `routeSlug`, and `categories` frontmatter. Existing posts use dated URLs, so keep those route fields unchanged. Optional `cover`, `coverAlt`, and `toc` fields are supported.

Existing media lives under `public/images/`; legacy WordPress upload paths are preserved through redirects. Comments use Giscus and GitHub Discussions in `aresowj/ouwww.com`.

Cloudflare Pages should use `npm run build` as the build command and `dist` as the output directory. DNS and Cloudflare settings are managed outside this repository.
