# Media management

New media belongs under `public/images/`, organized by year and month when useful:

```text
public/images/2026/09/example.png
```

Reference it from Markdown with a site-relative URL such as `/images/2026/09/example.png`.

The `public/wp-content/uploads/` directory is retained only for existing WordPress image URLs. Do not add new media there unless the file must match an existing legacy URL.

There is no WordPress media library or attachment database in the Astro site. Media is versioned with the repository and published with the next Cloudflare Pages build.
