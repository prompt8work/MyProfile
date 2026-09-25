# PromptAtWork — Phased Development Plan

This folder breaks the [PRD](../PRD.md) down into build phases, in order. Each phase file covers one phase: its goal, scope, deliverables, technical tasks, acceptance criteria, and dependencies.

## The architecture gap

The PRD specifies **Next.js + React + TypeScript + Sanity CMS + Supabase PostgreSQL + Vercel** (PRD §45–48, §107). The current codebase is a **Vite SPA with static JSON/TypeScript data files** — no CMS, no database, no server framework. There is no incremental path from one to the other that avoids a framework migration: Sanity's ISR/webhook revalidation model and Next.js Server Actions are both Next.js-specific. Phase 0 addresses this before any further UI work goes into the old stack.

## Phase order

| Phase | Name | Goal | PRD refs |
|---|---|---|---|
| [0](00-foundation.md) | Foundation | Migrate Vite → Next.js before building further | §45–48, §107 |
| [1](01-static-core.md) | Static Core | Ship the redesigned P0 portfolio pages on real routes | §14–19, §92–95 |
| [2](02-cms-sanity.md) | CMS Integration | Move Projects/Experience/Resume onto Sanity | §63–71, §82, §89 |
| [3](03-dynamic-backend.md) | Dynamic Backend | Supabase Postgres + Contact form end-to-end | §41–42, §54, §63, §76 |
| [4](04-ai-lab-content.md) | AI Lab & Content | Tools, Experiments, Prompts, Automations, Blog, YouTube, LinkedIn | §23–36, §65–68, §86–89 |
| [5](05-training-platform.md) | Training Platform | Courses, Batches, Schedule, Registration | §37–42, §69, §74–75 |
| [6](06-hardening-polish.md) | Hardening & Polish | SEO, analytics, accessibility, admin, security | §76–99 |
| [7](07-launch.md) | Launch | Definition of Done checklist, go-live on promptatwork.com | §106 |
| [8](08-v2-future.md) | V2 — AI Assistant | Python/FastAPI + RAG over published content | §108 |

## Priority mapping (PRD §100)

- **P0 (Must Have)** — covered by Phases 0–3: portfolio pages, CMS-driven Projects/Experience/Resume, PostgreSQL, Contact.
- **P1 (Should Have)** — covered by Phases 4–6: AI Lab, Content platform, Training, YouTube/LinkedIn sync, SEO, analytics, moderation.
- **P2 (Future)** — Phase 8: AI content generation, Portfolio AI Assistant, RAG, GitHub integration, newsletter.

## How to use these files

Each phase file is a working checklist. As work completes, check items off in place rather than rewriting the file — these documents are meant to be edited over the life of the project, not regenerated. A phase is done when its **Acceptance Criteria** section is fully satisfied, not just when its tasks are checked.

## Design reference

The visual direction for Phases 1 onward follows the homepage mockup built from PRD §7–12 (light ivory/charcoal base, sage-olive brand accent, cyan reserved for AI/technical zones, Playfair Display + Geist + JetBrains Mono). See the mockup artifact linked in the project conversation history, or rebuild the design tokens from PRD §10–11 if the artifact link has lapsed.
