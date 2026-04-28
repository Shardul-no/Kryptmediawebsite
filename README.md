# Krypt Media Website

**Agency:** Krypt Media LLP — Mumbai-based full-stack digital agency
**Tagline:** DECODE · DELIVER · DOMINATE
**Contact:** kryptmedia24@gmail.com · +91 89280 30419 · krypt.in
**Socials:** @krypt_media345 (IG/X) · krypt-media (LinkedIn)
**Co-founders:** Priyanshu Naik, Taniksh Waingankar, Kartik Mistry (CTO)

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| UI | React | 19 |
| Build | Vite | 7 |
| Routing | React Router DOM | 7 |
| Styling | Tailwind CSS | 4 (CSS-first config) |
| Animation | Framer Motion | 12 |
| Animation | GSAP | 3 |
| 3D | Three.js + React Three Fiber | latest |
| 3D Physics | @react-three/rapier | latest |

---

## Brand Design System

### Color Tokens (Tailwind v4 — defined in `src/index.css` `@theme`)

| Token | Hex | Usage |
|---|---|---|
| `krypt-orange` | `#ED921D` | Primary CTA, accents, links |
| `krypt-apricot` | `#F2A966` | Hover states, gradient blend |
| `krypt-cream` | `#F3E9C2` | Light section backgrounds, body bg |
| `krypt-sand` | `#EBCB9F` | Card backgrounds, mid-tones |
| `krypt-olive` | `#ABAD8C` | Subtle borders, dividers |
| `krypt-charcoal` | `#15171C` | Dark sections, hero bg, footer |

Usage in JSX: `bg-krypt-orange`, `text-krypt-charcoal/60`, `border-krypt-olive/20`

### Typography

| Font | Token | Weight | Role |
|---|---|---|---|
| Playfair Display | `font-playfair` | 700, 900 | Headings, editorial numbers |
| DM Sans | `font-dm` | 400, 500 | Body copy, UI labels, buttons |
| Cormorant Garamond | `font-cormorant` | 400 italic | Quotes, taglines, italic accents |

Fonts are loaded via Google Fonts in `index.html`. Tokens are defined as `--font-*` in `@theme`.

Hero headline sizing pattern: `style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}`

### Gradient Mesh (Hero / CTA Sections)

Dark sections use three absolutely-positioned blurred divs with CSS keyframe animations (`animate-blob`, `animate-blob-2`, `animate-blob-3`). Always pair with `<GrainOverlay />` and a `bg-krypt-charcoal` base.

### Scroll Animation Pattern

```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}
```

---

## File Structure

```
src/
├── components/             # Shared reusable components
│   ├── — UI primitives —
│   ├── GrainOverlay.jsx      SVG feTurbulence noise overlay (place in relative containers)
│   ├── SectionBadge.jsx      Orange pill label above section headings
│   ├── FeatureCard.jsx       Hover-lift card with label/icon/title/desc
│   ├── ProcessStep.jsx       Editorial numbered step (01, 02, 03)
│   ├── TestimonialCard.jsx   Star rating + Cormorant italic quote + author
│   ├── PricingCard.jsx       Pill-bordered tier card (highlighted = dark bg)
│   ├── FAQItem.jsx           Framer Motion accordion item
│   ├── MarqueeTicker.jsx     Infinite CSS marquee (light + dark variants)
│   │
│   ├── — Layout/Nav —
│   ├── Navbar.jsx            Sticky nav: transparent-on-hero → cream on scroll
│   ├── Footer.jsx            Charcoal dark footer with socials + co-founders
│   ├── ProjectLayout.jsx     Layout for standalone project demo pages
│   │
│   ├── — Shared sections (used across inner pages) —
│   ├── ContactSection.jsx    Full contact CTA section (used in multiple pages)
│   ├── ContactForm.jsx       Form with validation
│   ├── WhatsAppFixed.jsx     Global floating WhatsApp button (bottom-right)
│   ├── WhatsAppButton.jsx    Inline CTA button with service-specific message
│   ├── ServiceDetailHero.jsx Hero for /services/:slug pages
│   │
│   ├── — Animation effects (inner pages) —
│   ├── BlurText.jsx          Character-by-character blur reveal
│   ├── ScrollReveal.jsx      Scroll-triggered text reveal
│   ├── SectionReveal.jsx     Fade-up reveal wrapper
│   ├── GradualBlur.jsx       Progressive blur effect
│   ├── ScrollVelocity.jsx    Velocity-based scroll ticker
│   ├── CurvedLoop.jsx        Curved text loop marquee
│   │
│   ├── — 3D / WebGL effects —
│   ├── CircularGallery.jsx   3D rotating gallery (ProjectsPage)
│   ├── InfiniteMenu.jsx      OGL-based 3D circular menu (TestimonialsPage)
│   ├── Waves.jsx             Animated wave background (ContactSection)
│   ├── Lanyard.jsx           Discord presence / 3D badge card
│   ├── FlowingMenu.jsx       Full-page hover menu with marquee (ServiceInfo pages)
│   ├── TerminalProcess.jsx   Terminal-style animated process display
│   └── useMediaQuery.js      Hook for responsive breakpoints (legacy, used in ServicesPage)
│
├── sections/               # Homepage-specific section components
│   ├── HeroSection.jsx       Full-viewport dark hero with animated gradient mesh
│   ├── WhyUsSection.jsx      4 feature cards on cream bg
│   ├── ProcessSection.jsx    3 editorial numbered steps
│   ├── SplitSection.jsx      2 alternating text + gradient visual blocks
│   ├── TestimonialsSection.jsx  3 testimonial cards on warm-tinted bg
│   ├── PricingSection.jsx    3 pricing tiers (₹25k / ₹55k / ₹1.2L)
│   ├── FAQSection.jsx        Sticky header + accordion (6 questions)
│   └── CTASection.jsx        Full-bleed dark gradient CTA banner
│
├── pages/                  # Route-level page components
│   ├── HomePage.jsx          Assembles all sections/ in order
│   ├── ServicesPage.jsx
│   ├── ServiceDetailPage.jsx Dynamically renders ServiceInfo/* based on slug
│   ├── ProjectsPage.jsx
│   ├── ProjectDetailPage.jsx Lazy-loads from projects/
│   ├── AboutPage.jsx
│   ├── TestimonialsPage.jsx
│   ├── ContactPageRoute.jsx
│   └── ServiceInfo/          Detailed sub-pages per service
│       ├── BrandStrategy.jsx
│       ├── ContentWriting.jsx
│       ├── DesignServices.jsx
│       ├── SocialMediaMarketing.jsx
│       ├── VideoProduction.jsx
│       └── WebsiteDesign.jsx
│
├── projects/               # Standalone project demo mini-apps
│   ├── dmx/                  DMX RGIT event UI demo
│   ├── ecommerce/            E-commerce UI demo
│   ├── gyro-3d/              Three.js gyroscope 3D demo
│   └── mumbai-studio/        Mumbai Studio landing page demo
│
├── data/                   # Static JSON content
│   ├── services.json         Service cards (title, desc, slug, icon)
│   ├── projects.json         Portfolio projects (used in ProjectsPage + ProjectDetailPage)
│   ├── serviceSlugs.js       Maps service title strings → URL slugs
│   └── testimonials.json     Client testimonials (used in TestimonialsPage)
│
├── layouts/
│   └── MainLayout.jsx        Wraps all standard pages: Navbar + <Outlet> + WhatsAppFixed + Footer
│
├── hooks/
│   └── useMediaQuery.js      Returns boolean for responsive breakpoints
│
├── App.jsx                 Route definitions — no global context wrappers needed
├── main.jsx                React root mount (BrowserRouter here)
├── index.css               Tailwind @theme tokens + custom animations
└── App.css                 Minimal global resets (mostly empty)
```

---

## Routing

```
/                           → HomePage        (MainLayout)
/services                   → ServicesPage    (MainLayout)
/services/:serviceSlug      → ServiceDetailPage (MainLayout)
/projects                   → ProjectsPage    (MainLayout)
/about                      → AboutPage       (MainLayout)
/testimonials               → TestimonialsPage (MainLayout)
/contact                    → ContactPageRoute (MainLayout)
/projects/:projectSlug      → ProjectDetailPage (NO MainLayout — standalone demos)
```

Project slugs: `dmx`, `mumbai-studio`, `gyro-3d`, `ecommerce`
Service slugs: defined in `src/data/serviceSlugs.js`

---

## Data Files

| File | Used by | Purpose |
|---|---|---|
| `services.json` | ServicesPage, ServiceDetailPage | Service card content |
| `projects.json` | ProjectsPage, ProjectDetailPage | Portfolio grid |
| `serviceSlugs.js` | ServiceDetailPage, ServicesPage | Title → slug mapping |
| `testimonials.json` | TestimonialsPage | Full testimonials page data |

> **Note:** Homepage testimonials, pricing, and FAQ data are hardcoded inline inside `src/sections/` files — not pulled from JSON. Edit those files directly to update homepage content.

---

## Homepage Section Order

`HomePage.jsx` assembles sections in this order:
1. `HeroSection` — dark gradient mesh, headline, CTAs, logo strip
2. `MarqueeTicker` — orange ticker: DECODE · DELIVER · DOMINATE
3. `WhyUsSection` — cream, 4 feature cards
4. `MarqueeTicker` — dark variant: service names
5. `ProcessSection` — sand bg, 3 numbered editorial steps
6. `SplitSection` — cream, 2 split blocks (philosophy + mindset)
7. `TestimonialsSection` — warm tinted, 3 testimonial cards
8. `PricingSection` — cream, ₹25k / ₹55k / ₹1.2L tiers
9. `FAQSection` — sand bg, 6 accordion FAQs
10. `CTASection` — dark gradient banner, dual CTAs

---

## Development

```bash
npm install
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # Production build → dist/
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Deployment

- Deployed on **Vercel** — config in `vercel.json`
- SPA routing handled by `public/_redirects`
- Google Fonts loaded via `<link>` in `index.html` (not CSS @import, for performance)
- Large 3D assets (`.glb`) live in `public/` — not bundled

---


### Directory Structure

```
public/
├── assets/
│   ├── companyLogo/          # Client logos (logo-client-name.png)
│   ├── projects/             # Project thumbnails (project-slug-thumb.jpg)
│   └── services/             # Service icons (service-name-icon.png)
├── hero/                     # Hero section videos/images
├── models/                   # 3D models (.glb, .gltf)
├── projects/                 # Demo-specific assets
│   ├── project-slug/
│   │   ├── reels/           # Video reels (reel-01.mp4, reel-02.mp4)
│   │   ├── showreel/        # Main showreel (showreel.mp4)
│   │   └── images/          # Static images
└── 3d/                       # 3D icons and models
```

### Media Reference Updates Needed

**Critical files requiring renaming:**

1. **Hero Videos** (`/public/herohorizontal/` → `/public/hero/`):
   - `46d06c94bfc3fd977a1cf86cbc56f81c_720w.mp4` → `hero-midnight-studio-demo.mp4`
   - `From KlickPin CF Redo media website design.mp4` → `hero-dmx-rgit-demo.mp4`
   - `d84c51e6a87f5549ea177e87e3771ad9.mp4` → `hero-rajhans-travels-demo.mp4`

2. **3D Models** (`/public/3d/`):
   - `a_contemporary_3d_icon_representing_creative_desig_glb.glb` → `icon-3d-creative.glb`
   - `a_sleek_3d_symbol_representing_social_media_market_glb (2).glb` → `icon-3d-social-media.glb`

3. **Videohut Assets**:
   - `gettyimages-1452644429-612x612.jpg` → `project-videohut-hero.jpg`
   - `Video-*.mp4` → `reel-01.mp4`, `reel-02.mp4`, etc.
   - `t3oWwHTiHPdqvISgXglF9dJecA.mp4` → `showreel-videohut.mp4`

### Code Files Requiring Updates

After renaming assets, update these files:
- `src/sections/FeaturedWorkSection.jsx` - Hero video paths
- `src/sections/ContainerScrollSection.jsx` - Video paths  
- `src/data/projects.json` - Project image paths
- `src/data/services.json` - Service image paths
- `src/projects/videohut/index.jsx` - Video reel paths
- `src/projects/videohut/styles.css` - Background image paths

---

## Project Demos

### How Demos Work

Each project in `/src/projects/` is a **standalone mini-application** with its own:
- Independent routing (no MainLayout wrapper)
- Custom animations and interactions
- Project-specific assets in `/public/projects/{slug}/`
- Separate HTML/CSS/JS when needed

### Demo Access

**Live demos:** `/projects/{project-slug}`
- `/projects/dmx` - DMX RGIT tech startup
- `/projects/mumbai-studio` - Midnight Sound Studio  
- `/projects/gyro-3d` - 3D gyroscope demo
- `/projects/videohut` - Video production studio
- `/projects/milton` - Product showcase
- `/projects/sienna` - Fashion interactions

### Demo Maintenance

**Adding new demos:**
1. Create folder: `/src/projects/{slug}/`
2. Add assets: `/public/projects/{slug}/`
3. Update `src/data/projects.json` with `"hasDemo": true`
4. Route automatically available at `/projects/{slug}`

**Demo requirements:**
- Use `ProjectLayout.jsx` for consistent wrapper
- Follow naming conventions for demo assets
- Test standalone functionality
- Include responsive design
- Optimize assets for web (compress videos, resize images)

---

## Rules for AI Assistants

- **Color:** Always use `krypt-*` tokens. Never introduce blue/grey palettes or Bootstrap patterns.
- **Fonts:** `font-playfair` for headings, `font-dm` for body/UI, `font-cormorant italic` for quotes.
- **Spacing:** Sections use `py-28 md:py-36`. Cards hover with `-translate-y-1.5`.
- **Animations:** Use the `FadeUp` scroll pattern (Framer Motion `useInView`) defined in each section. Don't add GSAP to new homepage sections.
- **Tailwind v4:** No `tailwind.config.js`. All tokens live in `@theme` in `src/index.css`. Custom utilities (`.animate-blob`, `.animate-marquee`) are plain CSS in that file.
- **New homepage sections:** Create in `src/sections/`, import in `HomePage.jsx`. Follow the existing pattern: `SectionBadge` → heading → body → content.
- **Inner pages:** Use `ScrollReveal`, `SectionReveal`, `GradualBlur` for animation — they match the legacy style of non-homepage pages.
- **Do not add** `ColorProvider`, theme switchers, or external CSS frameworks. The design system is self-contained in `index.css`.
- **3D components:** All use React Three Fiber. Check Three.js version compatibility before updating dependencies.
- **Media assets:** Follow naming conventions strictly. Use descriptive names, no random hashes or platform prefixes. Update all references when renaming files.
- **Demo projects:** Test standalone functionality. Ensure demos work without MainLayout wrapper and have proper asset paths.
