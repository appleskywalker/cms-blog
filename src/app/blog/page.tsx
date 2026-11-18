// /blog — list page. SSR with 60s revalidation. Pulls every PUBLISHED
// post for this site domain, sorted by published_at DESC.

import type { Metadata } from 'next'
import { listPosts, SITE_DOMAIN } from '@/lib/cms'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Aviation CRE Blog | Part 145, Hangars, FBOs, and Airports',
  description: 'Hangar leases, Part 145 compliance, FBO sales, and ground-lease vs fee simple analysis. By a dual-licensed CRE broker across NJ and TX.',
  alternates: { canonical: `https://${SITE_DOMAIN}/blog` },
}

export default async function BlogIndex() {
  const posts = await listPosts({ post_type: 'blog', limit: 100 })

  return (
    <>
      <section className="hero-bg pt-24 pb-4 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="breadcrumbs">
            <a href="/">Home</a><span className="sep">/</span><span>Blog</span>
          </nav>
        </div>
      </section>

      <section className="hero-bg text-white pb-16">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <div className="inline-flex items-center gap-x-6 mb-6 px-3 py-1 border border-flag/60 rounded-full text-flag text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-flag"></span>
            Aviation CRE Blog
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] font-semibold mb-6">
            Hangars, Part 145, FBOs,<br />
            <span className="text-flag">by someone who&rsquo;s been there.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            Written by Angelo Mitlo &mdash; Aviation CRE broker, NJ #0894102 &middot; TX #842584.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-center text-ink-muted">No posts published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map(p => {
                const date = p.published_at ? new Date(p.published_at) : null
                const dateStr = date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''
                return (
                  <a key={p.id} href={`/blog/${p.slug}`} className="group block p-7 border border-ink/10 hover:border-flag rounded transition">
                    {p.category && (
                      <div className="text-flag text-xs uppercase tracking-[0.2em] font-semibold mb-3">{p.category}</div>
                    )}
                    {dateStr && (
                      <div className="text-ink-muted text-xs uppercase tracking-[0.2em] font-semibold mb-3">{dateStr}</div>
                    )}
                    <h2 className="font-display text-xl text-ink mb-2 group-hover:text-flag transition leading-[1.08]">{p.title}</h2>
                    {p.excerpt && <p className="text-ink-soft text-sm">{p.excerpt}</p>}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
