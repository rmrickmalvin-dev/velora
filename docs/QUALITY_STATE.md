# QUALITY STATE - VELORA

Last update: 2026-08-27

## BUILD 04

CLOSED AND VALIDATED

## PASSO 41 - Search and navigation

- [x] accent-insensitive Search
- [x] multi-term Search
- [x] deterministic relevance ranking
- [x] Brand Search
- [x] Category label Search
- [x] Product slug Search
- [x] query-aware Category counts
- [x] local Catalog Suggestions
- [x] URL-backed query state
- [x] URL-backed Category state
- [x] Category controls synchronize URL state
- [x] browser back/forward synchronization
- [x] no Search localStorage
- [x] persistent Catalog refresh preserved
- [x] persistent Inventory refresh preserved
- [x] React effect synchronous setState removed

## Design Token integrity

- [x] all referenced VELORA CSS variables defined
- [x] primary token registry definitions unique
- [x] registered scoped token overrides allowed
- [x] gold-400 defined
- [x] gold-800 defined
- [x] ink-400 defined
- [x] space-7 defined
- [x] automated CSS token reference contract

## PASSO 41 Test Evidence

Targeted:

```text
6 test files
50 tests
50 passed
0 failed
```

Complete suite:

```text
99 test files
787 tests
787 passed
0 failed
```

## Latest Technical Gate

- [x] Product Discovery ESLint `--max-warnings=0`
- [x] npm run lint
- [x] npm run typecheck
- [x] npm run test
- [x] npm run build
- [x] npm run check

## Next Quality Gate

PASSO 45 - Runtime Performance, Responsive and SEO Hardening.

## PASSO 42 Quality Evidence

- [x] Product Detail browser runtime sync
- [x] Product name sync
- [x] Brand sync
- [x] Variant price sync
- [x] Inventory quantity and availability sync
- [x] Catalog change subscription
- [x] Inventory change subscription
- [x] SSG initial shell preserved
- [x] Admin controls preserved
- [x] Add-to-Cart interaction preserved
- [x] PT-BR localization integrity
- [x] ES localization integrity
- [x] automated Product Detail runtime boundary tests
- [x] automated localization integrity tests
- [x] BUILD 04 readiness test

Final BUILD 04 gate:

```text
102 test files
811 tests
811 passed
0 failed
ESLint warnings: 0
TypeScript: passed
Production build: passed
Static pages: 57/57
```

BUILD 04 is CLOSED AND VALIDATED.

## BUILD 05

IN PROGRESS

## PASSO 43 Browser Quality Evidence

- [x] Playwright Chromium harness
- [x] axe runtime accessibility harness
- [x] PT-BR Home WCAG A/AA
- [x] EN Home WCAG A/AA
- [x] ES Home WCAG A/AA
- [x] PT-BR Category WCAG A/AA
- [x] EN Category WCAG A/AA
- [x] ES Category WCAG A/AA
- [x] PT-BR Product WCAG A/AA
- [x] EN Product WCAG A/AA
- [x] ES Product WCAG A/AA
- [x] global focus-visible baseline preserved
- [x] reduced-motion baseline preserved
- [x] Playwright artifacts ignored

Technical gate:

```text
Source contract: 8/8
Browser E2E: 9/9
Vitest: 819/819
Test files: 103/103
ESLint warnings: 0
TypeScript: passed
Production build: passed
Static pages: 57/57
```

BUILD 05 remains IN PROGRESS.

## PASSO 44 Runtime Accessibility Evidence

- [x] Cart trigger controls stable dialog id
- [x] Cart modal focus entry
- [x] Tab focus trap
- [x] Shift+Tab focus trap
- [x] Escape close
- [x] focus restoration
- [x] body scroll lock preserved
- [x] reduced-motion behavior preserved
- [x] Product Discovery Category keyboard activation
- [x] URL-backed Category state via keyboard
- [x] Next smooth-scroll transition hint
- [x] 60 second Playwright test budget for runtime accessibility stability
- [x] deterministic single-worker browser quality execution
- [x] Escape focus-restoration stability: 3/3 repeated
- [x] clean Playwright loopback development origin

Technical gate:

```text
Source contract: 8/8
Cart boundary regression: 8/8
Keyboard E2E: 4/4
Escape stability repeat: 3/3
Complete browser E2E: 13/13
Vitest: 827/827
Test files: 104/104
ESLint warnings: 0
TypeScript: passed
Production build: passed
Static pages: 57/57
```

BUILD 05 remains IN PROGRESS.
