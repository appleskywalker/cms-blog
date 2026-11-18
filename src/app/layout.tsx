// Root layout — shared head + chrome for every /blog route.
//
// Reads per-site branding from src/lib/branding.ts keyed by the
// SITE_DOMAIN env var. One codebase, N sites, zero conditional code
// at this level.

import type { Metadata } from 'next'
import { SITE_DOMAIN } from '@/lib/cms'
import { getBranding } from '@/lib/branding'
import './globals.css'

const brand = getBranding(SITE_DOMAIN)

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_DOMAIN}`),
  title: { default: `${brand.fullName} — Blog`, template: `%s | ${brand.shortName}` },
  description: brand.blogDesc,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    siteName: brand.shortName,
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

function Wordmark({ brand }: { brand: ReturnType<typeof getBranding> }) {
  // Text-based brand wordmark in Playfair Display — no logo image file
  // required per-site. First word gets flag red accent on hover to match
  // the design language.
  return (
    <a href="/" className="flex items-center gap-3 group" aria-label={`${brand.shortName} home`}>
      <span className="font-display text-2xl text-white group-hover:text-flag transition leading-none">
        {brand.shortName}
      </span>
      {brand.tagline && (
        <span className="hidden lg:inline text-xs text-white/50 uppercase tracking-[0.2em] border-l border-white/15 pl-3 ml-1">
          {brand.tagline}
        </span>
      )}
    </a>
  )
}

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-sticky border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Wordmark brand={brand} />
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/90 font-medium">
          {brand.nav.map(n => (
            <a key={n.href} href={n.href} className="hover:text-flag transition">{n.label}</a>
          ))}
        </nav>
        <a href={brand.ctaHref} className="px-4 py-2 rounded bg-flag text-white text-sm font-semibold tracking-wide">
          Get in touch
        </a>
      </div>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-black text-white/70 pt-14 pb-8 border-t border-flag/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display text-2xl text-white mb-3">{brand.shortName}</div>
            <p className="text-sm leading-relaxed">{brand.footerBlurb}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-4">Angelo Mitlo</h4>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a></li>
              {brand.licenseLines.map(line => <li key={line}>{line}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-4">Required disclosures</h4>
            <ul className="space-y-2 text-sm">
              {brand.disclosures.map(d => (
                <li key={d.href}>
                  <a href={d.href} target="_blank" rel="noopener">{d.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-4">
          <div>&copy; {year} {brand.shortName} &middot; Angelo Mitlo. All rights reserved.</div>
          <div>{brand.disclaimer}</div>
        </div>
      </div>
    </footer>
  )
}
