---
name: uj-iras
description: Add or update a piece of writing on problemas.hu, either an on-site analysis under content/problemak/ or a link to an external publication (Substack) on the home page. Use for "új írás", "új cikk", "tedd ki a Substack-posztomat", "add this article".
---

# Új írás a problemas.hu-ra

The text is published under the author's own name. Write in Hungarian, keep the author's wording, and ask when a fact, number, title or summary is missing. Never invent one.

## 1. Pick the kind

| The author has | Where it goes |
|---|---|
| A link to an already published text (Substack or elsewhere) | `home.thoughts.publications` in `content/index.md` |
| A text that should live on this site | a new file in `content/problemak/` |

## 2a. External publication

Add an item to `home.thoughts.publications` in `content/index.md`. The list renders in file order.

```yaml
- title: A cím pontosan úgy, ahogy a forrásnál szerepel
  description: Egy-két mondat arról, mit vizsgál az írás.
  url: https://fecz0.substack.com/p/slug
```

Quote YAML values that contain a colon. Open the URL and check that it resolves and that the title matches.

## 2b. On-site analysis

Create `content/problemak/<ascii-slug>.md`. The route becomes `/problemak/<ascii-slug>/`.

```yaml
---
title: Cím
date: 'YYYY-MM-DD'
tldr: Egy-két mondatos összefoglaló. Ez lesz a meta leírás is.
status: Kutatás   # Kutatás | Javaslat | Megvalósítás
linkedin: https://www.linkedin.com/...   # only if a real post exists
bluesky: https://bsky.app/...            # only if a real post exists
---
```

`content.config.ts` is the source of truth for the fields. The home page lists these files newest `date` first.

Optional step-by-step block:

```md
::incremental-steps

::step-item{number="0" title="Jelenlegi állapot"}
Leírás.
::

::
```

## 3. Check the claims

The site's own principle (`content/szemleletem.md`): rely on data where it exists, and say so where it does not. For every number or factual claim, either link a source or mark it as an estimate. List unsupported claims to the author before publishing. Prefer a link to the specific document over a site's front page or category page.

## 4. Update the tests

`tests/pages.spec.ts` hard-codes the current list:

- the number of Substack publications (`toHaveCount`) and the test's name
- the first link in the "Gondolatok" region, which is the newest on-site analysis

Update them to match the new content.

## 5. Verify

```bash
pnpm exec nuxi typecheck
pnpm test:e2e
pnpm generate
```

Then open the home page and the new page in the dev server, in light and dark mode. Publish through a pull request; merging to `main` deploys the site.
