# Deagensie Web Platform — Technical Handover & Developer Documentation

**Project Name**: Deagensie Web Application  
**Client / Owner**: Deagensie Inc.  
**Version**: 2.0.0 (Editorial Redesign Edition)  
**Date**: September 2026  
**Primary Stack**: Nuxt 4, Vue 3, Tailwind CSS v4, TypeScript, `@iconify/vue`

---

## 📋 Executive Summary

This document serves as the complete **Technical Handover & System Documentation** for the Deagensie website platform. The project has undergone an extensive **editorial redesign**, elevating the visual identity and user experience to match high-end corporate standards (referencing **Andela**).

Key highlights of this release include:

- Complete transition from dark/complex backgrounds to a **clean, open white editorial layout system**.
- Implementation of a custom, performant **`v-reveal` Directive Animation System** for site-wide scroll entrance effects.
- **Interactive Stacking Cards Animation** on the Homepage for the _"Unmatched Growth Architecture"_ section.
- **Full Portfolio Overhaul (`/portfolio`)** with 100% cover image coverage, clean category filters, and a custom **Interactive Project Detail Modal**.
- Dedicated, fully validated **Contact Us Page (`/contact`)**.
- Comprehensive **Site-Wide Button Audit** ensuring zero dormant buttons across all routes.

---

## 🎨 Design System & Visual Architecture

### 1. Color System

The visual language balances high contrast editorial white space with Deagensie's core brand accents:

- **Primary Background**: Clean White (`#FFFFFF`) / Warm Off-White (`#FAFAFA` / `#F8FAFC`).
- **Brand Accent Cyan**: `#05DED5` (Used for highlights, progress meters, check icons, and hover states).
- **Brand Accent Blue**: `#04308F` (Used for primary badges, headlines emphasis, button fills, and dark backgrounds).
- **Brand Accent Purple**: `#8F039C` (Used for accelerator badges, tags, and secondary accents).
- **Neutral Dark Text**: `#020B1E` / `#111827` (Used for primary headings and high contrast typography).
- **Subtle Borders**: `#F3F4F6` / `#E5E7EB` (Clean line separation inspired by editorial print media).

### 2. Typography

- **Headings (`font-serif`)**: Playfair / Modern Serif styling for high-impact editorial headlines (`text-3xl lg:text-5xl font-serif font-normal`).
- **Body Text (`font-sans`)**: Inter / System Sans-Serif font stack for crisp legibility across viewports.
- **Metrics / Code (`font-mono`)**: Monospaced font family for count-up numbers and performance metrics.

---

## ⚡ Animation System Architecture

All scroll-triggered animations are driven by a centralized custom directive in `app/app.vue` and global CSS animation classes in `app/assets/css/main.css`.

### Usage Syntax in Vue Templates:

```html
<!-- Default fade-up animation -->
<div v-reveal>...</div>

<!-- Specific animation variant -->
<div v-reveal="'fade-up'">...</div>
<div v-reveal="'scale-in'">...</div>
<div v-reveal="'blur-in'">...</div>
<div v-reveal="'clip-up'">...</div>
<div v-reveal="'fade-left'">...</div>
<div v-reveal="'fade-right'">...</div>
```

### Keyframe & Utility Classes in `main.css`:

- `.v-reveal`: Initial state (`opacity: 0`, `transform: translateY(32px)`).
- `.v-reveal-visible`: Active state applied by Intersection Observer when element enters viewport.
- `.animate-float`: Continuous ambient floating effect for decorative UI elements.
- `.animate-pulse-slow`: Subtle glow pulses for hero badges.

---

## 🧩 Page & Component Technical Reference

### 1. Homepage (`app/pages/index.vue` & `app/components/pages/(home)/`)

- **`0.vue` (Hero Section)**: Floating interactive graphic composition, typewriter keyword animation, floating match tags, count-up stats metric counters.
- **`1.vue` (Partners / Client Logos)**: Clean logo ticker showcase.
- **`2.vue` (Unmatched Growth Architecture)**:
  - **Stacking Cards Scroll Animation**: Pure CSS `sticky` positioning (`top-32`, `top-40`, `top-48`) combined with staggered `z-index` layering (`z-10`, `z-20`, `z-30`). As the user scrolls, Card 2 slides up to overlap Card 1, and Card 3 slides up to overlap Card 2.
  - "Learn more" buttons link to `/business`, `/creatives`, and `/subscription`.
- **`3.vue` (Ecosystem Split Cards)**: Dual-column feature breakdown with checkmark bullet lists.
- **`4.vue` (Testimonials Grid)**: Professional 4-column client review cards.
- **`5.vue` to `7.vue`**: Additional resource spotlights and bottom conversion CTA section.

### 2. Portfolio Page (`app/pages/portfolio/index.vue`)

- **Category Filter Pills**: Non-sticky inline pill bar (`bg-white border-b border-gray-100 py-6`) allowing users to filter by _All Projects_, _Strategy_, _Branding_, _Product Design_, _UI/UX_, _Technology_, and _Creative Economy_.
- **`PortfolioCard.vue`**: Responsive card component supporting inset and below layouts, hover image zoom, category tags, and preview modal trigger emitting `select(project)`.
- **Project Detail Modal (`Teleport to="body"`)**:
  - Full-screen glassmorphism backdrop (`bg-gray-900/60 backdrop-blur-sm`).
  - Cover image header, client name, full case study narrative, impact tags, and a direct CTA ("Discuss This Project") linking to `/contact`.
- **`app/data/portfolio.ts`**: Contains 10 complete project records with high-resolution image paths and real client titles.

### 3. Contact Us Page (`app/pages/contact/index.vue`)

- **Contact Hero**: Clean editorial headline with location details and quick response indicators.
- **Interactive Form**:
  - Validated fields: Full Name, Email Address, Service Category (Branding, TaaS, Growth Lab, General), Project Details message.
  - Reactive submission state displaying instant feedback toast upon sending.
- **Direct Scheduling**: CTA buttons linking to discovery call scheduling.

### 4. Navigation & Footer (`app/components/SiteHeader/` & `app/components/BackToTop.vue`)

- **`DesktopNav.vue`**: Dropdown mega-menus for _Business_, _Creatives_, _Why Deagensie?_, _About Us_, _Subscription_, and _Resource_.
- **`MobileNav.vue`**: Fullscreen mobile drawer with smooth slide transition.
- **`BackToTop.vue`**: Smooth scroll-to-top button appearing after 400px scroll depth.

---

## 🗄️ Data Models & Content Management

### Portfolio Record Schema (`app/data/portfolio.ts`):

```typescript
export interface PortfolioProject {
  id: string;
  title: string;
  category:
    'Strategy' | 'Branding' | 'Product Design' | 'UI/UX Design' | 'Technology' | 'Creative Economy';
  client: string;
  description: string;
  cover: string;
  tags: string[];
  featured?: boolean;
  layout?: 'inset' | 'below';
}
```

---

## 🚀 Deployment & Operations Guide

### Building & Running Production Bundle

```bash
# Install dependencies
pnpm install

# Build SSG / SSR bundle
pnpm run build

# Start production server
pnpm run preview
```

### Hosting & CDN Deployment

- **Vercel / Netlify**: Recommended for zero-config Nuxt deployment. Output directory is `.output/public` or `.output/server`.
- **Node Server**: Can be deployed to AWS EC2 / DigitalOcean using `node .output/server/index.mjs`.

---

## 🛠️ Maintenance & Future Roadmap

1. **Headless CMS Integration**: Replace static data in `app/data/portfolio.ts` and `app/data/resource.ts` with Strapi, Contentful, or Sanity CMS API hooks.
2. **Dynamic Form Backend**: Wire the `/contact` page form submission handler to SendGrid, Resend, or AWS SES webhook API endpoints.
3. **Lighthouse & SEO Monitoring**: Periodically run Google Lighthouse audits to monitor image asset compression and core web vitals performance.

---

_Handover documentation prepared by Antigravity AI Engineering Team for Deagensie._
