# Krypt Media Website

Modern React website with 3D graphics, animations, and routing. Built with Vite, React Router, and Three.js.

## Architecture

**Tech Stack:**
- React 19 + Vite 7
- React Router for navigation
- Three.js + React Three Fiber for 3D components
- Framer Motion for animations
- GSAP for advanced animations
- Tailwind CSS 4

**Core Structure:**
```
src/
├── components/          # Reusable UI components (25+ components)
├── pages/             # Route-based page components
├── layouts/           # Layout wrappers (MainLayout)
├── data/              # JSON data for content (services, projects, team, testimonials)
└── hooks/             # Custom React hooks
```

## Key Components

**3D/Graphics:**
- `Cubes.jsx` - 3D animated cubes with physics
- `Particles.jsx` - Particle system effects
- `CircularGallery.jsx` - 3D rotating gallery
- `Waves.jsx` - Animated wave effects

**UI/Animation:**
- `Navbar.jsx` - Main navigation with mobile menu
- `BlobCursor.jsx` - Custom cursor effects
- `ScrollReveal.jsx` - Scroll-triggered animations
- `InfiniteMenu.jsx` - Infinite scrolling menu

**Forms/Interaction:**
- `ContactForm.jsx` - Contact form with validation
- `Lanyard.jsx` - Discord presence integration

## Routing Structure

- `/` - Home page
- `/services` - Services listing
- `/services/:serviceSlug` - Individual service pages
- `/projects` - Projects portfolio
- `/projects/:projectSlug` - Project details
- `/about` - About/team page
- `/testimonials` - Client testimonials
- `/contact` - Contact form

## Data Management

Content is managed through JSON files in `src/data/`:
- `services.json` - Service offerings with metadata
- `projects.json` - Portfolio projects
- `team.json` - Team member information
- `testimonials.json` - Client testimonials
- `footer.json` - Footer links and information
- `serviceSlugs.js` - Service slug mappings

## Development

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint checks
```

## Deployment

- Vercel configuration in `vercel.json`
- Static asset optimization in `vite.config.js`
- Production builds output to `dist/`

## Maintenance Notes

- 3D components use React Three Fiber - check Three.js compatibility when updating
- Animation performance relies on GSAP and Framer Motion
- Images stored in `public/assets/` with organized subdirectories
- ESLint configured for React hooks and modern JS patterns