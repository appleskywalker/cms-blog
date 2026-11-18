// Per-site branding configuration.
//
// One codebase, four aviation sites, each reading a different SITE_DOMAIN
// env var. This config keys brand strings and nav shape by domain so the
// layout can render the right identity without conditional code scattered
// across pages.
//
// Adding a new site: append a key to BRANDING. All strings are plain
// text; HTML entities are safe because React escapes them. No logo
// image path is included — the layout renders a text wordmark in the
// display font instead, so this ships without any per-site asset work.

export interface NavLink { href: string; label: string }

export interface Branding {
  // Identity
  shortName:    string           // Header wordmark, footer heading
  fullName:     string           // <title> + schema publisher name
  tagline:      string           // Below wordmark in header (optional, falsy = no tagline)
  blogDesc:     string           // Blog list page description + default meta description
  logoSvg:      string           // Inline SVG markup rendered beside the wordmark. 48x48 viewBox,
                                 // flag-red (#c8102e) geometric mark designed specifically for
                                 // this site. No external asset file.

  // Hero for the /blog list page
  heroEyebrow:  string           // Small pill text at top
  heroLine1:    string           // Large display line 1
  heroLine2:    string           // Large display line 2 (highlighted)
  heroByline:   string           // Attribution subtitle under hero

  // Chrome
  nav:          NavLink[]        // Top nav items (right of wordmark)
  ctaHref:      string           // "Get in touch" button target

  // Footer
  footerBlurb:  string           // 1-2 sentence company description
  contactEmail: string           // mailto:
  licenseLines: string[]         // e.g. ["TREC #842584 (Texas)", "NJ #0894102 (New Jersey)"]
  disclosures:  { label: string; href: string }[]
  disclaimer:   string           // Bottom-right small print
}

// Original geometric marks drawn specifically for each site. All are
// 48x48 viewBox, flag-red fill, designed to read at 32-40px in the
// header. Intentionally simple and distinct — not stylized imitations
// of anything else.

const LOGO_PAPER_PLANE = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6 22 L42 6 L26 42 L22 30 L6 22 Z" fill="#c8102e"/>
  <path d="M22 30 L34 14" stroke="#1a0608" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const LOGO_HANGAR_ARCH = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6 40 L6 24 Q24 6 42 24 L42 40 Z" fill="none" stroke="#c8102e" stroke-width="3" stroke-linejoin="round"/>
  <line x1="6"  y1="40" x2="42" y2="40" stroke="#c8102e" stroke-width="3" stroke-linecap="round"/>
  <line x1="20" y1="40" x2="20" y2="28" stroke="#c8102e" stroke-width="2"/>
  <line x1="28" y1="40" x2="28" y2="28" stroke="#c8102e" stroke-width="2"/>
</svg>`;

const LOGO_PROPELLER = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="24" cy="24" r="4" fill="#c8102e"/>
  <path d="M24 4  Q28 14 24 22 Q20 14 24 4"  fill="#c8102e"/>
  <path d="M24 44 Q20 34 24 26 Q28 34 24 44" fill="#c8102e"/>
  <path d="M4  24 Q14 20 22 24 Q14 28 4  24" fill="#c8102e"/>
  <path d="M44 24 Q34 28 26 24 Q34 20 44 24" fill="#c8102e"/>
</svg>`;

const LOGO_AIRPORT_COMPASS = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="24" cy="24" r="18" fill="none" stroke="#c8102e" stroke-width="2"/>
  <line x1="24" y1="2"  x2="24" y2="46" stroke="#c8102e" stroke-width="2" stroke-linecap="round"/>
  <line x1="2"  y1="24" x2="46" y2="24" stroke="#c8102e" stroke-width="2" stroke-linecap="round"/>
  <circle cx="24" cy="24" r="4" fill="#c8102e"/>
</svg>`;

// Defaults. Any domain not in BRANDING falls through to these so the
// pipeline can't 404 on a typo.
const DEFAULT: Branding = {
  shortName: "Aviation CRE",
  fullName: "Aviation Commercial Real Estate",
  tagline: "Commercial real estate specialized for aviation",
  blogDesc: "Hangar leases, Part 145 compliance, FBO sales, and ground-lease vs fee simple analysis. By a dual-licensed CRE broker across NJ and TX.",
  logoSvg: LOGO_PAPER_PLANE,
  heroEyebrow: "Aviation CRE Blog",
  heroLine1: "Hangars, Part 145, FBOs,",
  heroLine2: "by someone who’s been there.",
  heroByline: "Written by Angelo Mitlo — Aviation CRE broker, NJ #0894102 · TX #842584.",
  nav: [{ href: "/blog", label: "Blog" }],
  ctaHref: "mailto:amitlo@aviationrespecialist.com",
  footerBlurb: "Commercial real estate specialized for aviation — hangars, Part 145 shops, FBOs, and MROs across Texas and New Jersey.",
  contactEmail: "amitlo@aviationrespecialist.com",
  licenseLines: ["TREC #842584 (Texas)", "NJ #0894102 (New Jersey)"],
  disclosures: [
    { label: "Texas IABS", href: "/iabs.pdf" },
    { label: "TREC Consumer Protection Notice", href: "https://www.trec.texas.gov/forms/consumer-protection-notice" },
  ],
  disclaimer: "Site content for informational purposes. Not legal, tax, or appraisal advice.",
}

const BRANDING: Record<string, Branding> = {
  // The hub. Keeps the full nav with the on-page calculators + pillar links.
  "aviationcre.net": {
    ...DEFAULT,
    shortName: "Aviation CRE",
    fullName: "Aviation CRE",
    tagline: "The aviation real estate specialist",
    logoSvg: LOGO_PAPER_PLANE,
    nav: [
      { href: "/#services",     label: "Services" },
      { href: "/#calculators",  label: "Calculators" },
      { href: "/sell-part-145", label: "Sell Your Shop" },
      { href: "/#markets",      label: "Markets" },
      { href: "/blog",          label: "Blog" },
    ],
    ctaHref: "/#contact",
  },

  "hangaradvisor.com": {
    ...DEFAULT,
    shortName: "Hangar Advisor",
    fullName: "Hangar Advisor",
    tagline: "Independent hangar advisory",
    logoSvg: LOGO_HANGAR_ARCH,
    blogDesc: "Hangar leases, ground-lease math, build-vs-lease crossover, and the clauses that quietly decide the outcome. By a dual-licensed CRE broker.",
    heroEyebrow: "Hangar Advisor",
    heroLine1: "Hangar deals,",
    heroLine2: "advised honestly.",
    footerBlurb: "Independent hangar-lease and build-vs-lease advisory for aviation operators across Texas and New Jersey.",
  },

  "aviationrespecialist.com": {
    ...DEFAULT,
    shortName: "Aviation RE Specialist",
    fullName: "Aviation Real Estate Specialist",
    tagline: "Dual-licensed CRE for aviation businesses",
    logoSvg: LOGO_PROPELLER,
    blogDesc: "Part 145, FBO, hangar, and airport real estate — by a dual-licensed CRE broker specializing in aviation businesses across NJ and TX.",
    heroEyebrow: "Aviation Real Estate Specialist",
    heroLine1: "Aviation real estate,",
    heroLine2: "handled by a specialist.",
    footerBlurb: "Commercial real estate for aviation businesses — Part 145 shops, FBOs, hangars, and airport parcels across Texas and New Jersey.",
  },

  "airportcre.com": {
    ...DEFAULT,
    shortName: "Airport CRE",
    fullName: "Airport CRE",
    tagline: "Commercial real estate in airport markets",
    logoSvg: LOGO_AIRPORT_COMPASS,
    blogDesc: "Airport-adjacent commercial real estate — ground leases, hangar builds, FBO sales, and the economics of aeronautical use. By a dual-licensed CRE broker.",
    heroEyebrow: "Airport CRE",
    heroLine1: "Where the airport",
    heroLine2: "meets commercial real estate.",
    footerBlurb: "Commercial real estate at the airport fence line — hangars, FBOs, ground leases, and aeronautical-use parcels across Texas and New Jersey.",
  },
}

export function getBranding(domain: string): Branding {
  return BRANDING[domain] || DEFAULT
}
