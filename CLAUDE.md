# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev                 # Start dev server on http://localhost:3000

# Build
pnpm build                # Build for production
pnpm preview               # Preview production build

# Testing
pnpm test                  # Run all tests
pnpm test:unit             # Run unit tests only (test/unit/*.{test,spec}.ts)
pnpm test:nuxt              # Run Nuxt component tests (test/nuxt/*.{test,spec}.ts)
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Run tests with coverage
pnpm test:e2e               # Run Playwright e2e tests (tests/ directory)
pnpm test:e2e:ui             # Run e2e tests with Playwright UI

# Linting
pnpm exec eslint .          # Lint all files
pnpm exec eslint --fix .    # Lint and auto-fix
```

## Architecture

This is a Nuxt 4 content-driven application using the following stack:

- **Nuxt 4** with `@nuxt/content` for markdown-based pages
- **@nuxt/ui** (v4) with Tailwind CSS 4 for styling
- **Vitest** with two test projects: `unit` (Node environment) and `nuxt` (Nuxt environment with happy-dom)
- **Playwright** for e2e testing

### Content System

Pages are driven by markdown files in `content/`. The catch-all route `app/pages/[...slug].vue` queries the content collection and renders it with `ContentRenderer`. Content collections are defined in `content.config.ts`.

### Test Structure

- `test/unit/` - Pure unit tests (Node environment)
- `test/nuxt/` - Component/integration tests (Nuxt environment)
- `tests/` - Playwright e2e tests
