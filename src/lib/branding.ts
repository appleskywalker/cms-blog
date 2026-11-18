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

// Defaults. Any domain not in BRANDING falls through to these so the
// pipeline can't 404 on a typo.
const DEFAULT: Branding = {
  shortName: "Aviation CRE",
  fullName: "Aviation Commercial Real Estate",
  tagline: "Commercial real estate specialized for aviation",
  blogDesc: "Hangar leases, Part 145 compliance, FBO sales, and ground-lease vs fee simple analysis. By a dual-licensed CRE broker across NJ and TX.",
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
