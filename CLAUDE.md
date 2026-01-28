# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun run dev              # Start dev server on http://localhost:3000

# Build
bun run build            # Build for production
bun run preview          # Preview production build

# Testing
bun run test             # Run all tests
bun run test:unit        # Run unit tests only (test/unit/*.{test,spec}.ts)
bun run test:nuxt        # Run Nuxt component tests (test/nuxt/*.{test,spec}.ts)
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Run tests with coverage
bun run test:e2e         # Run Playwright e2e tests (tests/ directory)
bun run test:e2e:ui      # Run e2e tests with Playwright UI

# Linting
bunx eslint .            # Lint all files
bunx eslint --fix .      # Lint and auto-fix
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
