# problemas.hu

A content-driven web application for analyzing complex societal and technological problems with incremental, practical solutions. Built with Nuxt 4 and designed for the Hungarian audience.

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) with Vue 3
- **Content:** [@nuxt/content](https://content.nuxt.com/) for markdown-based pages
- **UI:** [@nuxt/ui](https://ui.nuxt.com/) v4 with Tailwind CSS 4
- **Language:** TypeScript (strict mode)
- **Testing:** Vitest (unit/integration) + Playwright (e2e)
- **SEO:** @nuxtjs/sitemap, @nuxt/a11y for accessibility

## Prerequisites

- Node.js 24.x or later
- [Bun](https://bun.sh/) (recommended) or npm/pnpm

## Installation

```bash
bun install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Build

Build the application for production (static site generation):

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Testing

```bash
# Run all tests
bun run test

# Run unit tests only
bun run test:unit

# Run Nuxt component tests only
bun run test:nuxt

# Run tests in watch mode
bun run test:watch

# Run tests with coverage report
bun run test:coverage

# Run Playwright e2e tests
bun run test:e2e

# Run e2e tests with Playwright UI
bun run test:e2e:ui
```

## Project Structure

```
app/
  components/       # Vue components
  layouts/          # Page layouts
  pages/            # Route pages
  assets/css/       # Global styles
  error.vue         # Error page
  app.vue           # Root component
content/            # Markdown content files
  problemak/        # Problem analysis articles
test/
  unit/             # Unit tests (Node environment)
  nuxt/             # Component tests (Nuxt environment)
tests/              # Playwright e2e tests
public/             # Static assets
```

## Content System

Pages are driven by markdown files in the `content/` directory. Each article supports the following frontmatter:

```yaml
title: Article Title
date: '2025-01-01'
tldr: Short summary for readers
status: Kutatas | Javaslat | Megvalositas
linkedin: https://linkedin.com/...
bluesky: https://bsky.app/...
```

## Linting

```bash
# Lint all files
bunx eslint .

# Lint and auto-fix
bunx eslint --fix .
```

## Deployment

The build output is a fully static site in `.output/public/`, deployed to GitHub Pages

## License

MIT License - see [LICENSE](LICENSE) for details.
