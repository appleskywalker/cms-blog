// Root layout — shared head + chrome for every /blog route.
//
// The header/footer HTML mirrors the aviationcre.net static design:
// Playfair Display for display type, Inter for body, "flag" red
// (#c8102e) accents, and a fixed semi-transparent nav. This is the
// first CMS-driven site; future sites get their own layout.tsx via
// a per-site branding file read from the env.

import type { Metadata } from 'next'
import { SITE_DOMAIN } from '@/lib/cms'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_DOMAIN}`),
  title: { default: 'Aviation CRE Blog | Part 145, Hangars, FBOs, and Airports', template: '%s | Aviation CRE Blog' },
  description: 'Commercial real estate specialized for aviation — hangar leases, Part 145 compliance, FBO sales, and ground-lease vs fee simple analysis.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    siteName: 'Aviation CRE',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
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

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-sticky border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Aviation Real Estate Specialist" className="h-14 w-auto bg-white rounded px-2 py-1" />
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/90 font-medium">
          <a href="/#services">Services</a>
          <a href="/#calculators">Calculators</a>
          <a href="/sell-part-145">Sell Your Shop</a>
          <a href="/#markets">Markets</a>
          <a href="/blog">Blog</a>
        </nav>
        <a href="/#contact" className="px-4 py-2 rounded bg-flag text-white text-sm font-semibold tracking-wide">Get in touch</a>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-black text-white/70 pt-14 pb-8 border-t border-flag/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <img src="/logo.png" alt="Aviation Real Estate Specialist" className="h-16 w-auto bg-white rounded px-2 py-1 mb-4" />
            <p className="text-sm leading-relaxed">Commercial real estate specialized for aviation &mdash; hangars, Part 145 shops, FBOs, and MROs across Texas and New Jersey.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-4">Angelo Mitlo</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:amitlo@aviationrespecialist.com">amitlo@aviationrespecialist.com</a></li>
              <li>TREC #842584 (Texas)</li>
              <li>NJ #0894102 (New Jersey)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-4">Required disclosures</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/iabs.pdf" target="_blank">Texas IABS</a></li>
              <li><a href="https://www.trec.texas.gov/forms/consumer-protection-notice" target="_blank" rel="noopener">TREC Consumer Protection Notice</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-4">
          <div>&copy; 2026 Aviation CRE &middot; Angelo Mitlo. All rights reserved.</div>
          <div>Site content for informational purposes. Not legal, tax, or appraisal advice.</div>
        </div>
      </div>
    </footer>
  )
}
