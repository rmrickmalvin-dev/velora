# AI HANDOFF - VELORA

Last update: 2026-09-01

CODAL OS - Complete Edition active.

## State

BUILD 06 - RELEASE CLOSED AND VALIDATED

Latest validated step:

PASSO 48D - Production Verification

## Search Intelligence

Use:

`buildStorefrontSearchExperience`

Search is:

- accent-insensitive
- multi-term AND
- deterministic
- ranked only when query exists

Searchable fields:

- Product name
- Brand
- localized Category label
- slug

## Discovery URL state

Browser adapter:

`browser-discovery-navigation`

Parameters:

- `q`
- `category`

Product Search input and Category controls must use:

`updateDiscovery`

Do not reintroduce direct Category-only state changes that bypass URL synchronization.

Initial URL-state React updates are queued inside the effect.

## Persistent Catalog compatibility

Keep:

- `loadBrowserStorefrontProductCards`
- `subscribeBrowserStorefrontDataChanged`

## Design Token quality

All referenced VELORA CSS variables under `src` must resolve to the primary Design Token registry.

Primary definitions are unique.

Registered scoped overrides are valid.

## Quality Gate

```text
PASSO 41 targeted: 50/50
Full suite:         787/787
Test files:         99/99
ESLint warnings:    0
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 41:

`CODAL-DEC-001 -> CODAL-DEC-278`

Next:

`CODAL-DEC-279`

## Next action

PASSO 45 - Runtime Performance, Responsive and SEO Hardening.

Focus:

- Product Detail browser-persistent Catalog synchronization
- persistent price/name/stock parity between Discovery and Detail
- PT-BR/ES human-facing accent integrity
- bounded i18n regression tests
- BUILD 04 readiness audit
- close BUILD 04 only if all gates pass

## PASSO 42 Closure Handoff

BUILD 04 is CLOSED AND VALIDATED.

Product Detail runtime rules:

- keep the static route and `generateStaticParams`
- keep the static model as the initial render
- browser-visible Product Detail must refresh through `loadBrowserStorefrontProductDetail`
- react to `subscribeBrowserStorefrontDataChanged`
- UI must not access localStorage or repositories directly
- Catalog and Inventory overrides must stay equivalent between Discovery and Detail

Localization rules:

- PT-BR and ES human-facing copy must preserve correct accents
- keep TypeScript source automation-safe through Unicode escapes when needed
- preserve `storefront-localization-integrity.test.ts`

Validated BUILD 04 baseline:

```text
102 test files
811 tests
811 passed
57 static pages
ESLint warnings: 0
```

Decisions:

`CODAL-DEC-001 -> CODAL-DEC-288`

Next:

`CODAL-DEC-289`

Next phase:

BUILD 05 - Quality.

## PASSO 43 Quality Handoff

BUILD 05 is IN PROGRESS.

Browser Quality commands:

```text
npm run test:e2e
npm run quality
```

Playwright:

- Chromium
- isolated port 3100
- Home, Category and Product
- PT-BR, EN and ES

axe:

- WCAG 2 A
- WCAG 2 AA
- WCAG 2.1 A
- WCAG 2.1 AA

Do not move browser E2E tests into the Vitest `src` suite.

Keep:

- `src/build05-quality-harness.test.ts`
- `e2e/storefront-accessibility.spec.ts`
- `playwright.config.ts`

Next decision:

`CODAL-DEC-297`

Next action:

PASSO 45 - Runtime Performance, Responsive and SEO Hardening.

## PASSO 44 Runtime Accessibility Handoff

BUILD 05 remains IN PROGRESS.

Preserve these Cart modal rules:

- trigger uses `aria-haspopup="dialog"`
- trigger uses `aria-expanded`
- trigger uses `aria-controls="velora-cart-dialog"`
- drawer uses `role="dialog"`
- drawer uses `aria-modal="true"`
- drawer id remains `velora-cart-dialog`
- close control receives initial focus
- Tab and Shift+Tab remain trapped in the open dialog
- Escape closes
- closing restores previous focus
- body scroll lock remains scoped to the open drawer

Preserve Product Discovery Category keyboard activation through the existing URL-backed Navigation adapter. Preserve the 60 second Playwright test budget and single-worker browser quality execution unless new browser evidence supports a different deterministic configuration.

Browser evidence:

```text
Keyboard E2E: 4/4
Escape stability repeat: 3/3
Complete browser E2E: 13/13
Vitest: 827/827
```

Next decision:

`CODAL-DEC-305`

Next action:

PASSO 46 - Clean Install, CI Readiness and BUILD 05 Closure.

## PASSO 45 Performance Responsive and SEO Handoff

BUILD 05 remains IN PROGRESS.

Preserve:

- public Home, Category and Product as Server Component entry routes
- Client Component reviewed budget at 18 unless a later decision explicitly raises it
- current lightweight SVG-only conceptual visual asset layer
- canonical locale paths and `x-default`
- Open Graph and Twitter summary metadata on public Storefront journeys
- private demo routes outside robots discovery
- public-only sitemap policy
- `NEXT_PUBLIC_SITE_URL` as the deployment-origin contract
- 320 / 768 / 1440 responsive runtime matrix
- single-worker Playwright quality execution from PASSO 44

Do not hard-code a production host before Release.

Current evidence:

```text
Vitest: 841/841
Test files: 106/106
Responsive + SEO E2E: 12/12
Complete browser E2E: 25/25
ESLint warnings: 0
Production build: passed
```

Next decision:

`CODAL-DEC-313`

Next action:

PASSO 47 - BUILD 06 Release Candidate and Production Configuration.

## PASSO 46 BUILD 05 Closure Handoff

BUILD 05 - Quality is CLOSED AND VALIDATED.

The project has clean-install proof independent from the active historical `node_modules`.

Preserve:

- Node 24.13.0
- npm 11.6.2
- `package-lock.json`
- `npm ci`
- `npm run quality`
- Playwright single-worker browser execution
- `.github/workflows/quality.yml`
- `.env.example`
- `NEXT_PUBLIC_SITE_URL` with no fake default production host
- 849/849 Vitest
- 107/107 test files
- 25/25 browser E2E
- 59/59 production static generation

Do not accept the active workspace dependency tree as release reproducibility evidence when it contains historical extraneous packages. The isolated PASSO 46 clean install is the authoritative BUILD 05 proof.

Next decision:

`CODAL-DEC-321`

Next action:

PASSO 47 - BUILD 06 Release Candidate and Production Configuration.

## PASSO 46 Dependency and ESLint Compatibility Handoff

BUILD 05 remains CLOSED AND VALIDATED.

Do not upgrade ESLint to 10.x while `eslint-config-next@16.3.1` still loads incompatible eslint-plugin-react code in this project.

Current validated line:

- package.json keeps ESLint `^9`
- package-lock resolves ESLint `9.39.5`
- eslint-config-next `16.3.1`
- zero-warning lint

Preserve the precise npm dependency statement:

- fresh npm 11.6.2 install is reproducible
- two known optional packages are labeled extraneous by npm
- prune dry-run reports no change

For package-lock integrity on Windows, prefer Git-normalized blob equality plus `git diff --quiet`. Do not rely on raw working-tree SHA256 alone because line-ending normalization can change it.

Next decision:

`CODAL-DEC-324`

Next action:

PASSO 47 - BUILD 06 Release Candidate and Production Configuration.

## PASSO 47 BUILD 06 Release Candidate Handoff

BUILD 06 is IN PROGRESS.

The local Release Candidate is provider-neutral.

Do not invent:

- Git remote
- GitHub repository URL
- deployment provider
- production host
- deployment success
- remote CI success

Use:

```text
npm run release:preflight
npm run release:candidate
npm run release:deploy-check
```

`release:deploy-check` must remain blocked until all real external release inputs exist.

Current external blockers:

- no remote
- no upstream
- no real `NEXT_PUBLIC_SITE_URL`
- no selected provider
- no remote CI execution
- no deployed production URL

Next decision:

`CODAL-DEC-331`

Next action:

PASSO 48 - Remote Repository, Deployment Origin and Production Validation.

## PASSO 47 Direct Preflight Recovery Handoff

The Release Candidate readiness script may be invoked either through npm or directly with Node.

Do not make `npm_execpath` a hard requirement.

Validated behavior:

- npm lifecycle path when `npm_execpath` exists
- PATH fallback when direct Node invocation omits it
- `cmd.exe` fallback on Windows
- exact npm 11.6.2 requirement preserved

Next decision:

`CODAL-DEC-332`

Next action:

PASSO 48 - Remote Repository, Deployment Origin and Production Validation.

## PASSO 48 BUILD 06 Production Closure Handoff

BUILD 06 - Release is CLOSED AND VALIDATED.

Production identity:

- GitHub: `rmrickmalvin-dev/velora`
- branch/upstream: `master -> origin/master`
- provider: Vercel
- project: `velora`
- canonical origin: `https://velora-nine-delta.vercel.app`
- deployment source: Git
- public SSO protection: disabled
- `NEXT_PUBLIC_SITE_URL` is configured only in Vercel Production
- committed `.env.example` remains blank

Release evidence:

- application-bearing release SHA `001f393`
- GitHub Actions Quality: success
- Vercel deployment: READY
- PASSO 48D `release:deploy-check`: pass for all strict local requirements
- public production smoke: pass
- robots and sitemap use the canonical production origin
- no runtime errors observed during the verification window

Preserve:

- provider-neutral `scripts/release-readiness.mjs`
- Git-based Vercel production deployment
- Node 24.13.0
- npm 11.6.2
- `eslint: ^9` until the complete Next / React lint stack supports ESLint 10
- LF repository policy
- Playwright single-worker browser quality contract
- public-only sitemap policy
- private demo routes outside robots discovery
- no fake payment, identity or security claims

Do not treat the readiness-script provider WAIT as a failed production gate. Provider selection is intentionally verified outside that local provider-neutral script.

Official decisions:

`CODAL-DEC-001 -> CODAL-DEC-338`

Next:

`CODAL-DEC-339`

No new BUILD is automatically open.
