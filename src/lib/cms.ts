// CMS API client — thin fetch wrapper around the CREOS public endpoints.
//
// All requests go to CMS_API_BASE (default: https://app.bulldogbrokercre.com)
// and scope to the configured SITE_DOMAIN. One process per site domain so
// the env tells us which site this instance renders — same codebase, 5
// pm2 instances, 5 different sites.

export interface Post {
  id:             string
  site_id:        string
  title:          string
  slug:           string
  excerpt:        string | null
  content?:       string
  featured_image: string | null
  status:         string
  brand:          string | null
  category:       string | null
  tags:           string[] | string | null
  meta:           any
  published_at:   string | null
  post_type:      string
  created_at:     string
  updated_at:     string
}

const BASE = process.env.CMS_API_BASE || 'https://app.bulldogbrokercre.com'
const SITE = process.env.SITE_DOMAIN  || 'aviationcre.net'

// 60s edge cache, then ISR-style stale-while-revalidate. Matches the
// CMS endpoint's own cache-control, so the whole pipeline stays warm.
const REVALIDATE = 60

async function cmsFetch(path: string): Promise<any> {
  const url = `${BASE}${path}`
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`CMS ${res.status} on ${path}`)
  return res.json()
}

export async function listPosts(opts: { post_type?: string; limit?: number } = {}): Promise<Post[]> {
  const qs = new URLSearchParams({ site: SITE })
  if (opts.post_type) qs.set('post_type', opts.post_type)
  if (opts.limit)     qs.set('limit', String(opts.limit))
  try {
    const data = await cmsFetch(`/api/public/posts?${qs}`)
    return Array.isArray(data?.posts) ? data.posts : []
  } catch (e) {
    console.error('[cms] listPosts failed:', (e as Error).message)
    return []
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const qs = new URLSearchParams({ site: SITE, slug })
  try {
    return await cmsFetch(`/api/public/posts?${qs}`)
  } catch (e: any) {
    if (String(e.message).includes('404')) return null
    console.error('[cms] getPost failed:', e?.message || e)
    return null
  }
}

export const SITE_DOMAIN = SITE
