# cms-blog

A reusable Next.js blog renderer that pulls from the CREOS CMS public API.
One codebase, one process per site domain. Each pm2 instance reads a
different `SITE_DOMAIN` env var, pulls that site's posts, and renders
them under `/preview/blog` (or `/blog` once the legacy static is retired).

## Environment

```
SITE_DOMAIN=aviationcre.net            # which site's posts to render
CMS_API_BASE=https://app.bulldogbrokercre.com
BLOG_BASE_PATH=/preview                # change to "" to serve at /blog
PORT=3010
```

## Routes

- `/preview/blog`         – list page
- `/preview/blog/[slug]`  – detail page

## Deploy (first time, per site)

```bash
ssh bulldogbroker
cd /var/www
git clone git@github.com:appleskywalker/cms-blog.git cms-blog-aviationcre
cd cms-blog-aviationcre
npm install --production=false
SITE_DOMAIN=aviationcre.net BLOG_BASE_PATH=/preview npm run build
pm2 start npm --name cms-blog-aviationcre --env production -- start -- -p 3010
pm2 save
```

Then add an nginx block in the aviationcre.net server config:

```
location /preview/ {
  proxy_pass http://127.0.0.1:3010;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}
```

## Promoting to live (replace static /blog)

1. Migrate the existing static blog HTML files into CMS DB rows (one-off script).
2. Change `BLOG_BASE_PATH` to `""` and rebuild.
3. Change nginx `location /preview/` to `location /blog/`.
4. Reload nginx.
