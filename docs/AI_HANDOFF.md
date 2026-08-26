# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - IN PROGRESS

Latest validated step:

PASSO 24 - Design System Foundation and Storefront Shell

## Visual identity

Pearl Technology is now implemented as CSS tokens.

Core direction:

- pearl white base
- dark ink text
- champagne/gold accent
- negative space
- translucent surfaces
- restrained shadows
- premium but human
- Product remains protagonist

## Storefront page

`src/app/[locale]/page.tsx`

uses:

- createStaticVeloraRuntime
- buildStorefrontHomeModel
- StorefrontShell

## Critical composition rule

SSG/server rendering:

`createStaticVeloraRuntime`

Browser persistent workflows later:

`createBrowserVeloraRuntime`

Do not call IndexedDB during SSG.

## UI data rule

Do not hardcode Product/Variant/Inventory commercial records into components.

Visible Product cards must come through Application data.

## i18n

Storefront shell copy exists in:

- pt-BR
- en
- es

Locale switch uses explicit text labels and locale codes.

## Assets

Current Product art is CSS-generated conceptual art.

This is intentional for PASSO 24.

Final Product images can be added later without changing Domain entities.

## Quality Gate

```text
PASSO 24 targeted: 16/16
Full suite:         231/231
Test files:         29/29
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 24:

`CODAL-DEC-001 -> CODAL-DEC-123`

Next:

`CODAL-DEC-124`

## Next action

PASSO 25 - Storefront Product Discovery and Product Card Interaction.

Focus next on:

- richer Product discovery
- category filtering
- search-ready presentation boundary
- Product card interaction
- Product detail route foundation

Preserve the current Pearl Technology shell.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. docs/BUILD_01_CLOSURE.md
7. docs/DESIGN_SYSTEM.md
8. CHANGELOG.md