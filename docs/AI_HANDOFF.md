# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Unit 01B - Domain Foundation

Latest validated step:

PASSO 19 - Seed Foundation

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain
- `0e461a3` - cart domain
- `bffa30d` - order domain
- `9ee0376` - repository contracts

## Seed Foundation

Location:

`src/infrastructure/seed`

Exports:

- createVeloraSeed
- veloraSeed
- VeloraSeed

Baseline:

```text
Categories:           4
Products:             8
Variants:            15
Media:               16
Inventory:           15
InventoryMovements:  15
```

All catalog data is fictional.

## Seed rules

- use Domain factories
- keep baseline deterministic
- keep baseline immutable
- keep ids stable
- keep slugs stable
- keep SKUs stable
- preserve referential coherence
- one Inventory per ProductVariant
- one initial ENTRY movement per Inventory
- do not seed Cart or Order as immutable baseline

## Media rule

Seed media paths are logical contracts.

Final image assets may be added later without changing Domain entities.

## Quality Gate

Latest evidence:

```text
PASSO 19 targeted: 12/12
Full suite:         144/144
Test files:         18/18
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 19:

`CODAL-DEC-001 -> CODAL-DEC-081`

Next:

`CODAL-DEC-082`

## Next action

PASSO 20 - Local Repository Implementations.

Local repositories should initialize from the immutable seed but maintain mutable working state separately.

Do not mutate `veloraSeed`.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md