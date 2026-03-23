# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gubel Family Vineyards — a premium website for a single-vineyard estate winery in Calistoga, Napa Valley. The site should convey luxury, elegance, and the family's story of passion for winemaking. Founded by Gustavo and Joanne Gubel, the winery specializes in Clone 6 Cabernet Sauvignon made with winemaker Robbie Meyer using minimum-intervention techniques.

## Tech Stack

- **Pure HTML, CSS, and JavaScript** — no frameworks or build tools
- **Square** for e-commerce integration (wine purchases, wine club subscriptions)
- Static site served directly from HTML files

## Development

### Local Development

Serve the site locally with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node (if npx available)
npx serve .
```

No build step, no compilation, no package manager required.

### File Structure

```
/
├── index.html              # Homepage
├── pages/                  # Interior pages
│   ├── our-story.html
│   ├── crafting-excellence.html
│   ├── our-soils.html
│   ├── wines.html
│   ├── wine-club.html
│   └── contact.html
├── assets/
│   ├── css/
│   │   ├── style.css       # Global styles and variables
│   │   └── pages/          # Page-specific stylesheets if needed
│   ├── js/
│   │   ├── main.js         # Shared functionality (nav, animations)
│   │   └── square.js       # Square e-commerce integration
│   ├── images/             # Optimized site images (WebP preferred)
│   └── fonts/              # Self-hosted web fonts
└── CLAUDE.md
```

## Architecture & Conventions

### Design System

- **Brand colors:** Gold `#B98D58`, Cream `#F9F8F4`, Dark `#242E35`
- **Typography:** Use a refined serif for headings (e.g., Playfair Display) and a clean sans-serif for body text
- **CSS custom properties** defined in `:root` in `style.css` for all colors, spacing, and typography
- **Mobile-first responsive design** — breakpoints at 768px (tablet) and 1024px (desktop)

### HTML Conventions

- Each page is a standalone `.html` file with shared `<header>` and `<footer>` markup
- Use semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- All pages must include proper `<meta>` tags for SEO and Open Graph

### CSS Conventions

- Use CSS custom properties for theming — no hardcoded color values
- BEM-like naming: `.section-hero__title`, `.nav__link--active`
- Animations should use `prefers-reduced-motion` media query for accessibility
- No CSS frameworks — all styles are hand-written

### JavaScript Conventions

- Vanilla JS only — no jQuery or libraries
- Use ES6+ features (modules, arrow functions, template literals)
- `main.js` handles: mobile navigation toggle, scroll-based animations, smooth scrolling
- `square.js` handles: Square Web Payments SDK integration for checkout

### Images

- Use WebP format with JPEG fallbacks via `<picture>` element
- All images must have descriptive `alt` text
- Lazy load below-the-fold images with `loading="lazy"`

### Square Integration

- Square Web Payments SDK for processing wine purchases
- Wine club subscriptions use Square Subscriptions API
- Application ID and location ID are configured in `square.js`
- Use Square sandbox credentials during development, production credentials for deploy

### Age Verification

- The site must include an age verification gate (21+) before accessing wine purchase pages
- Store verification state in `sessionStorage` so it persists during a browsing session

## Site Pages

| Page | Purpose |
|------|---------|
| `index.html` | Hero, brand intro, featured wine, CTA to shop |
| `our-story.html` | Gustavo & Joanne's story, Argentine heritage, olive tree origin |
| `crafting-excellence.html` | Clone 6 Cabernet, winemaking process, Robbie Meyer |
| `our-soils.html` | Calistoga AVA terroir, volcanic soils, sustainability |
| `wines.html` | Product catalog with Square checkout integration |
| `wine-club.html` | 6-bottle ($459/6mo) and 12-bottle ($816/6mo) tiers |
| `contact.html` | Contact form, location info, visit scheduling |

## Contact Info (for footer/contact page)

- Location: Calistoga, California
- Phone: (323) 816-1697
- Email: sales@gubelfamilyvineyards.com
- Instagram: @gubelfamilyvineyards

## Accessibility

- All interactive elements must be keyboard accessible
- Maintain WCAG 2.1 AA contrast ratios (especially gold on cream backgrounds)
- Provide `aria-labels` for icon-only buttons and decorative elements

## Deployment

Static hosting — the site can be deployed to any static host (Netlify, Vercel, GitHub Pages, S3+CloudFront, etc.) with no build step required.
