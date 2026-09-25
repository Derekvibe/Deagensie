# Technical Handover for deagensie.com

Last updated: 2026-05-21
Prepared by: Emmanuel Oluwatobiloba Adeyeye

## Project Overview

- Nuxt 4 website using Vue 3 and TypeScript.
- Built as a marketing/site application with several main content areas and an interactive registration/subscription experience.
- Deployment target is Netlify via Nuxt Nitro preset.

## Tech Stack

- `Nuxt 4`
- `Vue 3`
- `TypeScript`
- `Tailwind CSS`
- `shadcn-nuxt` for UI components
- `vee-validate` + `zod` for form validation
- `notivue` for notifications
- `@vueuse/integrations/useIDBKeyval` for client-side draft storage
- `pnpm` package manager

## Repository Structure

- `app/`
  - `app.vue` — root app template
  - `assets/css/main.css` — global styles
  - `components/` — reusable UI and page-specific components
  - `composables/` — composable utilities such as API helpers and registration draft state
  - `lib/` — registration flows, option lists, and form progress logic
  - `middleware/` — middleware definitions
  - `pages/` — route entry points for the site
- `server/api/` — server endpoints for autocomplete/search data and offerings
- `public/` — static assets and images
- `netlify.toml` — Netlify build and publish settings
- `nuxt.config.ts` — Nuxt configuration
- `package.json` / `pnpm-lock.yaml` — dependencies and scripts

## Design & API Reference

- Figma design files: https://www.figma.com/design/gurA2yOY1SRmvbHq4N7YzN/Deagensie?m=auto&t=h4jpS2wPZ0CnPl6f-1
- Backend API base URL: https://deagensie-backend-z842.onrender.com/api
- Swagger docs: https://deagensie-backend-z842.onrender.com/api-docs

## Setup and Local Development

### Requirements

- Node `>= 24`
- `pnpm >= 11`

### Install dependencies

```bash
pnpm install
```

### Run local development server

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview production build

- The repo includes `pnpm preview`, but with `nitro.preset = 'netlify'` this preview mode may not behave as intended in the current deployment setup.
- If `pnpm preview` does not work, use `pnpm dev` for local development, or deploy to Netlify to validate the published output.

### Linting and formatting

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm typecheck
```

## Important Config Files

- `nuxt.config.ts`
  - `compatibilityDate: '2025-07-15'`
  - `devtools.enabled = true`
  - `typescript.strict = true`
  - `nitro.preset = 'netlify'`
  - runtime public config: `apiBase = process.env.NUXT_PUBLIC_API_BASE || '/api'`
  - image provider configured for Netlify during CI
- `netlify.toml`
  - `command = "pnpm build"`
  - `publish = "dist"`
  - `functions = ".netlify/functions-internal"`

## Key Scripts

- `dev` — `nuxt dev`
- `build` — `nuxt build`
- `generate` — `nuxt generate`
- `preview` — `nuxt preview`
- `install` — installs hooks and dependencies
- `postinstall` — runs `nuxt prepare`

## Main Application Flow

### Homepage

- `app/pages/(home)/index.vue` renders the homepage sections from `app/components/pages/(home)/`
- Primary CTA flows into registration and subscription pages

### Registration

- `app/pages/register/index.vue` selects the user path: business or creative
- `app/pages/register/[type]/index.vue` resumes saved registration drafts or starts the first step
- `app/pages/register/[type]/[step]/index.vue` renders a flow step and enforces step order
- Registration draft persistence is handled in `app/composables/use-registration-draft.ts`
  - saves data in IndexedDB using `useIDBKeyval`
  - supports resume/start-over behavior

### Subscription / Offerings

- `app/pages/subscription/index.vue` renders the offerings browser shell
- `app/pages/subscription/[code]/index.vue` renders the offering detail alongside the browser
- `app/components/pages/subscription/SubscriptionBrowser.vue` fetches `/api/offerings` and supports pagination and route sync

## Backend / Server API

- `server/api/industries.get.ts`
- `server/api/services.get.ts`
- `server/api/skills.get.ts`
- `server/api/stages.get.ts`
- `server/api/timelines.get.ts`
- `server/api/lead-sources.get.ts`
- `server/api/blog-categories.get.ts`
- `server/api/offerings/index.get.ts`
- `server/api/offerings/[code].get.ts`

### API behavior

- Most endpoints use `fuzzySearch` for filtered search and return paginated results.
- `useApiData` in `app/composables/use-api.ts` centralizes API calls and applies `config.public.apiBase`.

## Known Issues / Notes

- `pnpm preview` may not be compatible with the `netlify` Nitro preset in this repo. The safest local validation path is `pnpm dev` or a Netlify deploy preview.
- The repo includes `.env.example`; a local `.env` should be created from that file and is expected but not tracked in source control.

## Current Status / Outstanding Work

- Some pages still need correct or fitting images.
- Some `NuxtLink` and other internal links need final location assignments or route verification.

## Contacts

- Gift(Designer): `giftolungwe@gmail.com`
- Anthony(Backend): `anthonyolori123@gmail.com`
- Bright(Owner): `naetconsulting@gmail.com`

## Handover Checklist

- Confirm local development works with `pnpm dev`.
- Verify all internal links and route targets once final content is in place.
- Validate image assignments and page content consistency.
- Deploy to Netlify and confirm the live build output.

## Recommended Review Files

- `nuxt.config.ts`
- `netlify.toml`
- `app/pages/register/[type]/index.vue`
- `app/pages/register/[type]/[step]/index.vue`
- `app/composables/use-registration-draft.ts`
- `server/api/offerings/index.get.ts`
- `app/components/pages/subscription/SubscriptionBrowser.vue`

## Handover Notes for Maintainers

- Use `pnpm install` and `pnpm dev` for local work.
- Check Netlify settings if the build/deploy behavior differs from local results.
- Preserve the current registration flow validation logic and draft storage, since it is core to the experience.
- For content updates, work in `app/components/pages/*` and `app/pages/*`.
