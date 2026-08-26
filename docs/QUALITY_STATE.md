# QUALITY STATE - VELORA

Last update: 2026-08-26

## BUILD 01

Status: CLOSED AND VALIDATED

## BUILD 02

Status: IN PROGRESS

## PASSO 24 - Design System Foundation and Storefront Shell

### Design System

- [x] Pearl Technology color tokens
- [x] typography stacks
- [x] spacing scale
- [x] radius scale
- [x] shadow scale
- [x] borders
- [x] transition tokens
- [x] responsive content width
- [x] reduced motion baseline

### Storefront shell

- [x] sticky navigation
- [x] VELORA brand
- [x] locale switch
- [x] hero
- [x] category cards
- [x] featured Product cards
- [x] experience section
- [x] footer
- [x] responsive 1024/tablet behavior
- [x] responsive mobile behavior
- [x] no horizontal layout dependency

### Architecture integration

- [x] StaticVeloraRuntime
- [x] StorefrontHomeModel
- [x] Product cards sourced from Application
- [x] price formatting outside Domain
- [x] Inventory label derived in Presentation
- [x] SSG avoids IndexedDB
- [x] locale copy centralized
- [x] no commerce records hardcoded in UI

## PASSO 24 Test Evidence

Targeted:

```text
3 test files
16 tests
16 passed
0 failed
```

Complete suite:

```text
29 test files
231 tests
231 passed
0 failed
```

## Latest Technical Gate

- [x] npm run lint
- [x] npm run typecheck
- [x] npm run test
- [x] npm run build
- [x] npm run check
- [x] /pt-BR SSG
- [x] /en SSG
- [x] /es SSG
- [x] Proxy recognized

## Next Quality Gate

PASSO 25 - Storefront Product Discovery and Product Card Interaction.
## PASSO 24 CSS Warning Cleanup

Status: VALIDATED

The first PASSO 24 production build completed successfully but Turbopack reported CSS parser warnings because `src/styles/design-tokens.css` used CSS Modules-only `:global(...)` syntax inside a normal global `.css` file.

Correction:

- replaced `:global(:root)` with `:root`
- replaced remaining `:global(...)` selectors with valid global CSS selectors
- preserved the Pearl Technology tokens and reduced-motion rules
- no visual architecture decision changed

Validation after correction:

- lint passed
- typecheck passed
- 231/231 tests passed
- production build passed
- CSS warning audit passed
- no `:global(...)` remains in `design-tokens.css`

Next decision remains:

`CODAL-DEC-124`