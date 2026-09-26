# Deagensie — Premium Editorial Web Platform

> An Andela-inspired, high-end editorial web application for **Deagensie**, empowering business growth, AI-led branding, and global creative talent placement. Built with Nuxt 4, Vue 3, Tailwind CSS, and custom scroll animations.

---

## 🌟 Overview & Key Redesign Highlights

The Deagensie platform underwent a complete **editorial redesign** referencing top-tier platforms such as **Andela**, focusing on clean white backdrops, rich typography, responsive card layouts, and subtle scroll-triggered micro-animations.

### Key Achievements:

- **Andela-Inspired Editorial Aesthetic**: Clean white backdrops (`bg-white`), serif headlines (`font-serif`), shadow-elevated cards, and brand-accented glassmorphism (`#05DED5`, `#04308F`, `#8F039C`).
- **Site-Wide Custom Animation System**: Custom `v-reveal` directive powered by Intersection Observer supporting `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale-in`, `blur-in`, and `clip-up` effects.
- **Homepage Stacking Cards Scroll Animation**: Interactive sticky stacking cards for the _"Unmatched Growth Architecture"_ section where cards overlap seamlessly on scroll.
- **Overhauled Portfolio Experience (`/portfolio`)**:
  - 100% cover image assignment across all 10 showcase projects.
  - Interactive **Project Detail Modal** overlay with full client metadata, impact tags, and case study narrative.
  - Natural scrolling category filter pills (_All Projects_, _Strategy_, _Branding_, _Product Design_, _UI/UX_, etc.).
  - Intersection Observer-based count-up statistics.
- **Dedicated Contact Us Page (`/contact`)**:
  - Interactive project inquiry form with validation and responsive status feedback.
  - Office locations, email links, and direct discovery call scheduling buttons.
- **Subpage Refinement**: Standardized design across `/about`, `/business`, `/creatives`, `/subscription`, and `/resource`.
- **Zero Dormant Buttons**: Every button across the application links to a valid route (`/contact`, `/portfolio`, `/subscription`, `/business`, `/creatives`, `/resource`, `/about`) or triggers an interactive modal.

---

## 🛠️ Technology Stack

| Technology                    | Purpose                               |
| :---------------------------- | :------------------------------------ |
| **Nuxt 4**                    | Full-stack Vue SSR / SSG framework    |
| **Vue 3 (Composition API)**   | Reactive UI components & logic        |
| **Tailwind CSS v4**           | Utility-first styling & design tokens |
| **Iconify (`@iconify/vue`)**  | High-performance vector iconography   |
| **Intersection Observer API** | Scroll animations & count-up stats    |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/deagensie/deagensie-main.git

# Navigate to project directory
cd Deagensie-main

# Install dependencies
pnpm install
```

### Development Server

Start the local development server at `http://localhost:3000`:

```bash
pnpm run dev
```

### Production Build

Compile the application for production:

```bash
# Generate production bundle
pnpm run build

# Preview production build locally
pnpm run preview
```

---

## 📁 Project Directory Structure

```
Deagensie-main/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css        # Global CSS, animation keyframes & v-reveal styles
│   ├── components/
│   │   ├── BackToTop.vue       # Floating back-to-top scroll button
│   │   ├── SiteHeader/         # DesktopNav & MobileNav header components
│   │   └── pages/              # Modular page section components
│   │       ├── (home)/         # Homepage section components (0.vue to 7.vue)
│   │       ├── about/          # About page section components
│   │       ├── business/       # Business solutions section components
│   │       ├── creatives/      # Creatives network section components
│   │       ├── portfolio/      # PortfolioCard.vue & ProjectDetailModal
│   │       ├── resource/       # Resource Hub components & drawer
│   │       └── subscription/   # Subscription plans & offering details
│   ├── data/
│   │   ├── portfolio.ts        # 10 showcase project records with real images & metadata
│   │   └── resource.ts         # Resource Hub articles & filtering data
│   ├── pages/
│   │   ├── index.vue           # Homepage route
│   │   ├── about/              # About Us route
│   │   ├── business/           # Business route
│   │   ├── contact/            # Contact Us route
│   │   ├── creatives/          # Creatives route
│   │   ├── portfolio/          # Portfolio route with modal overlay
│   │   ├── resource/           # Resource Hub route
│   │   └── subscription/       # Subscription route
│   └── app.vue                 # Root app wrapper & custom v-reveal directive setup
├── public/
│   └── images/                 # Optimized webp/png imagery for works & pages
├── handover/
│   └── HANDOVER.md             # Complete technical handover documentation
└── README.md                   # Project documentation
```

---

## 📄 License & Credits

Designed & Developed for **Deagensie Inc.** All rights reserved.
