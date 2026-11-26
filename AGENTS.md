# AGENTS.md

Guidance for coding agents (Claude Code, Codex) working in this repository.

## Project

problemas.hu is Mile Ferenc's personal website: who they are, how they think, and what they write. It is a static Nuxt 4 site (`@nuxt/content`, `@nuxt/ui` v4, Tailwind CSS 4) deployed to GitHub Pages. Keep it small; add a dependency, module or abstraction only when the site needs it.

## Commands

Use pnpm only. Versions are pinned in `package.json` and `.node-version`.

```bash
pnpm dev                    # dev server on http://localhost:3000
pnpm generate               # static build into .output/public (what gets deployed)
pnpm preview                # preview the build
pnpm exec eslint .          # lint (--fix to auto-fix)
pnpm exec nuxi typecheck    # type check
pnpm exec vitest run        # unit and component tests, single run (`pnpm test` watches)
pnpm test:e2e               # Playwright tests in tests/
```

Before calling a change done, run lint, typecheck, vitest and e2e; run `pnpm generate` too when content, config or routing changed. Check visual changes in light and dark mode, desktop and mobile.

## Layout

- `content/`: Markdown pages. `index.md` holds the home page as frontmatter; `problemak/` holds on-site analyses. Schema: `content.config.ts`.
- `app/pages/index.vue` renders the home page, `app/pages/[...slug].vue` every other page, including SEO meta and structured data.
- `app/components/`: `IncrementalSteps` and `StepItem` are used from Markdown (MDC).
- `app/assets/css/main.css`: fonts, color tokens and the `editorial-*` styles. `app/app.config.ts`: Nuxt UI theme.
- `test/unit/`, `test/nuxt/`: Vitest. `tests/`: Playwright.

## Content and design rules

- Site text is Hungarian. Code, comments and commit messages are English.
- Never invent facts, experience, numbers or quotes about the author. Ask.
- Factual claims need a source or an explicit note that they are estimates.
- Use the existing `--editorial-*` and Nuxt UI semantic tokens, not raw colors.
- Links in content stay underlined.

## Delivery

- Work on a branch and open a pull request. Merging to `main` deploys.
- `main` requires the three CI checks. Dependabot patch and minor PRs are merged and deployed by the last job in `.github/workflows/ci.yml`; majors need a human.

## Gotchas

- `nuxi prepare` rewrites `.nuxtrc` after a `@nuxt/test-utils` upgrade. Commit the new value.
- `tests/pages.spec.ts` hard-codes the number and order of the listed writings.
- `pnpm-workspace.yaml` pins Vue through `overrides`.
- External Markdown links get `target` and `rel` from `content.build.markdown` in `nuxt.config.ts`.

## Skills and MCP

Skills live in `.agents/skills/` (`.claude/skills/` symlinks to them):

- `uj-iras`: adding or updating a piece of writing.
- `nuxt-ui`: official Nuxt UI skill.
- `nuxt-content`: community skill. Read it before changing collections, queries or Markdown processing; it is not auto-invoked everywhere.

MCP servers for current Nuxt UI and Nuxt Content docs are set up in `.mcp.json` and `.codex/config.toml`. When a skill disagrees with the installed package version or this repository's config, the repository wins.

Third-party skills are pinned in `skills-lock.json`. Review the diff after `pnpm dlx skills update`. Keep the project at four skills or fewer.
