// /blog/[slug] — detail page. SSR with 60s revalidation. Pulls the post
// by slug + site from CREOS public API and renders the content HTML
// authored in the v2 CMS editor.
//
// SEO: per-post <title> + meta description from the row's meta.title /
// meta.description (set via the SEO panel) with sensible fallbacks.
// Canonical, OG, Twitter cards all included. Article JSON-LD schema
// injected inline. FAQPage schema stays in the post's own HTML body
// since authors may or may not add one — the renderer doesn't guess.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, listPosts, SITE_DOMAIN } from '@/lib/cms'

export const revalidate = 60

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Not found' }

  const meta = (post.meta || {}) as Record<string, any>
  const seoTitle = meta.title || post.title
  const seoDesc  = meta.description || post.excerpt || undefined
  const url = `https://${SITE_DOMAIN}/blog/${post.slug}`

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: url },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url,
      type: 'article',
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at,
      authors: ['Angelo Mitlo'],
      section: post.category || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  }
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const date = post.published_at ? new Date(post.published_at) : null
  const dateStr = date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  // Rough read-time: ~220 words/min, body stripped of tags
  const text = String(post.content || '').replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const readMin = Math.max(1, Math.round(words / 220))

  // Pull 3 related posts (exclude self, same site)
  const siblings = (await listPosts({ post_type: 'blog', limit: 6 })).filter(p => p.slug !== post.slug).slice(0, 3)

  // Article schema. FAQPage schema may already be in the body HTML.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.featured_image || undefined,
    author: { '@type': 'Person', name: 'Angelo Mitlo', sameAs: [`https://${SITE_DOMAIN}`] },
    publisher: { '@type': 'Organization', name: 'Aviation CRE', logo: { '@type': 'ImageObject', url: `https://${SITE_DOMAIN}/logo.png` } },
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at,
    mainEntityOfPage: `https://${SITE_DOMAIN}/blog/${post.slug}`,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE_DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://${SITE_DOMAIN}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="hero-bg pt-24 pb-4 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="breadcrumbs">
            <a href="/">Home</a><span className="sep">/</span>
            <a href="/blog">Blog</a><span className="sep">/</span>
            <span>{post.title}</span>
          </nav>
        </div>
      </section>

      <section className="hero-bg text-white pb-16">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          {post.category && (
            <div className="inline-flex items-center gap-x-6 mb-6 px-3 py-1 border border-flag/60 rounded-full text-flag text-xs uppercase tracking-[0.2em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-flag"></span>
              {post.category}
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] font-semibold mb-6">{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8 italic">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70 pt-6 border-t border-white/10">
            <div><span className="text-white font-semibold">Angelo Mitlo</span><span className="text-white/50"> &middot; Aviation CRE &middot; TREC 842584 &middot; NJ 0894102</span></div>
            {dateStr && <div className="text-white/50">{dateStr}</div>}
            <div className="text-white/50">~ {readMin} min read</div>
          </div>
        </div>
      </section>

      <article className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose-article" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
      </article>

      {siblings.length > 0 && (
        <section className="py-20 bg-white border-t border-ink/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-flag text-xs uppercase tracking-[0.2em] font-semibold mb-3">Keep reading</div>
            <h2 className="font-display text-3xl md:text-4xl mb-10 text-ink">Related from the Aviation CRE blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siblings.map(s => (
                <a key={s.id} href={`/blog/${s.slug}`} className="group block p-7 border border-ink/10 hover:border-flag rounded transition">
                  {s.category && <div className="text-flag text-xs uppercase tracking-[0.2em] font-semibold mb-3">{s.category}</div>}
                  <h3 className="font-display text-xl text-ink mb-2 group-hover:text-flag transition">{s.title}</h3>
                  {s.excerpt && <p className="text-ink-soft text-sm">{s.excerpt}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
