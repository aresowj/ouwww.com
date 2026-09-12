# Cloudflare Pages deployment

This repository builds with Astro:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

`wrangler.toml` records the Pages output directory for Wrangler-based deployments. Cloudflare Pages Git integration still needs the build command set in the Pages project’s Build settings. If that field is blank, Pages skips the Astro build and fails because `dist/` does not exist.

Do not change DNS or production Cloudflare settings as part of normal content work.
