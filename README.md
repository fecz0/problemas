# problemas.hu

[Mile Ferenc](https://problemas.hu/rolam/)'s personal website, in Hungarian: an introduction, a way of thinking about problems, and writing on technology, organizations and shared systems.

It is a static site built with [Nuxt 4](https://nuxt.com/), [Nuxt Content](https://content.nuxt.com/) and [Nuxt UI](https://ui.nuxt.com/), deployed to GitHub Pages.

## Development

You need the Node.js version in `.node-version` and the pnpm version in `package.json`.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm generate     # static site in .output/public
pnpm preview      # preview the build
```

## Checks

```bash
pnpm exec eslint .
pnpm exec nuxi typecheck
pnpm exec vitest run                              # component tests
pnpm exec playwright install chromium --only-shell  # once
pnpm test:e2e                                     # builds the site, then tests it
```

## Content

Pages are Markdown files in `content/`:

- `index.md`: the home page, including the list of external publications
- `rolam.md`, `szemleletem.md`: standalone pages
- `problemak/`: on-site analyses, listed on the home page newest first

The available frontmatter fields are defined in `content.config.ts`.

## Deployment

Merging to `main` runs the checks and, if they pass, deploys the site. Dependabot patch and minor updates are merged and deployed the same way.

## Contributing

Disagreements and corrections are welcome as issues or pull requests. Guidance for coding agents is in [AGENTS.md](AGENTS.md).

## License

MIT, see [LICENSE](LICENSE).
