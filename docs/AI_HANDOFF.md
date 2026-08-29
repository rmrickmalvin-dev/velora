# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 05 - IN PROGRESS

Latest validated step:

PASSO 45 - Runtime Performance, Responsive and SEO Hardening

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

PASSO 46 - Clean Install, CI Readiness and BUILD 05 Closure.
