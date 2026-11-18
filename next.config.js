/** @type {import('next').NextConfig} */
module.exports = {
  // One-process-per-host: served behind nginx that forwards a specific
  // path prefix to this app. pm2 runs one instance per site domain,
  // each with its own SITE_DOMAIN env var.
  //
  // basePath (default '/preview') keeps the live /blog static HTML on
  // aviationcre.net untouched during the migration. nginx routes
  // /preview/* to this app; user previews CMS-driven /preview/blog/*
  // without SEO risk. When ready, flip basePath to '' and nginx /blog
  // routing cuts the static version over.
  basePath: process.env.BLOG_BASE_PATH ?? '/preview',
  reactStrictMode: true,
  // Allow the CMS droplet to serve featured images across domains.
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'app.bulldogbrokercre.com' },
    { protocol: 'https', hostname: 'bulldogbrokercre.com' },
    { protocol: 'https', hostname: 'bulldog-cre-media.nyc3.cdn.digitaloceanspaces.com' },
    { protocol: 'https', hostname: 'bulldog-cre-media.nyc3.digitaloceanspaces.com' },
  ] },
  poweredByHeader: false,
}
