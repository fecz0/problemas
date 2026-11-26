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
pnpm exec vitest run        # component tests, single run (`pnpm test` watches)
pnpm test:e2e               # builds the static site, then runs Playwright against it
```

Before calling a change done, run lint, typecheck, vitest and e2e; run `pnpm generate` too when content, config or routing changed. Check visual changes in light and dark mode, desktop and mobile.

## Layout

- `content/`: Markdown pages. `index.md` holds the home page as frontmatter, including external publications; `en.md` is the English profile; `problemak/` holds on-site analyses; `data/` holds the problem-solving cycle and the experience facts, shared by several pages. Schema: `content.config.ts`.
- `app/pages/index.vue` renders the home page, `app/pages/[...slug].vue` every other page.
- `app/layouts/en.vue` is the header and footer of `/en/`; `app/app.vue` picks it and the English UI locale by route. There is no i18n module.
- `scripts/render-brand-assets.mjs` renders the sharing images and site icons into `public/`; run it after `pnpm generate` and commit the output. Give a changed sharing image a new file name, because social networks cache it by URL.
- SEO: pages call `app/composables/usePageSeo.ts` (meta, canonical, `hreflang`, JSON-LD); the schema.org graph is built in `app/utils/structuredData.ts`. Public profiles live in `app/app.config.ts`.
- `app/components/`: `IncrementalSteps`, `StepItem`, `ProblemCycle`, `ExperienceFacts` and `ProfileLinks` are used from Markdown (MDC).
- `app/assets/css/main.css`: fonts, color tokens and the `editorial-*` styles. `app/app.config.ts`: Nuxt UI theme.
- `test/nuxt/`: Vitest component tests. `tests/`: Playwright, served by `scripts/serve-static.mjs`; `tests/static.spec.ts` checks the generated HTML without JavaScript.

## Content and design rules

- Site text is Hungarian, except the English profile at `/en/`. Code, comments and commit messages are English.
- Never invent facts, experience, numbers or quotes about the author. Ask.
- Don't name the author's current or past employers, anywhere in the repository.
- Factual claims need a source or an explicit note that they are estimates.
- Use the existing `--editorial-*` and Nuxt UI semantic tokens, not raw colors.
- Links in content stay underlined.
- No third-party requests at runtime: fonts come from `@nuxt/fonts`, icons from the installed `@iconify-json/*` packages (`lucide`, `simple-icons`).

## Delivery

- Work on a branch and open a pull request. `ci.yml` checks every PR; on `main` it also deploys, by calling `deploy.yml`.
- `main` requires the three check jobs, so keep their names. Dependabot patch and minor PRs are merged by the `dependabot-merge` job; majors need a human.

## Gotchas

- `nuxi prepare` rewrites `.nuxtrc` after a `@nuxt/test-utils` upgrade. Commit the new value.
- `tests/pages.spec.ts` hard-codes the number of listed writings and which are newest and oldest.
- `pnpm-workspace.yaml` pins Vue through `overrides`.
- External Markdown links get `target` and `rel` from `content.build.markdown` in `nuxt.config.ts`.

## Skills and MCP

Skills live in `.agents/skills/` (`.claude/skills/` symlinks to them):

- `uj-iras`: adding or updating a piece of writing.
- `nuxt-ui`: official Nuxt UI skill.
- `nuxt-content`: community skill. Read it before changing collections, queries or Markdown processing; it is not auto-invoked everywhere.

MCP servers for current Nuxt UI and Nuxt Content docs are set up in `.mcp.json` and `.codex/config.toml`. When a skill disagrees with the installed package version or this repository's config, the repository wins.

Third-party skills are pinned in `skills-lock.json`. Review the diff after `pnpm dlx skills update`. Keep the project at four skills or fewer.
