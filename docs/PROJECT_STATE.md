# PROJECT STATE - VELORA

Last update: 2026-08-25

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

Locales:

- PT-BR
- EN
- ES

## Phase

BUILD 01 - Foundation

## Current unit

01B - Domain Foundation

## State

IN PROGRESS

## Git checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain and movements
- `0e461a3` - cart domain and cart operations
- `bffa30d` - order domain and lifecycle
- `9ee0376` - domain repository contracts

## Latest validated step

PASSO 19 - Seed Foundation

## Seed Foundation

The first deterministic fictional VELORA baseline now exists in Infrastructure.

Collections:

- 4 ProductCategory records
- 8 Product records
- 15 ProductVariant records
- 16 ProductMedia records
- 15 Inventory records
- 15 initial InventoryMovement records

The baseline uses Domain factories rather than raw unvalidated objects.

## Fictional catalog

Brands:

- Aster
- Nivalis
- Halo
- Flux
- Veil

Product families include:

- smartphones
- audio
- charging
- protection

All catalog data is fictional and exists only for the VELORA portfolio case.

## Seed immutability

The seed container is frozen.

Every seed collection is frozen.

Domain entities are created through their existing factories and remain immutable.

`createVeloraSeed` can recreate the same deterministic baseline.

`veloraSeed` exposes the ready baseline instance.

## Referential coherence

Validated:

- unique category ids and slugs
- unique product ids and slugs
- valid Product -> ProductCategory relations
- unique variant ids and SKUs
- valid ProductVariant -> Product relations
- every Product has at least one ProductVariant
- valid ProductMedia relations
- optional media variant belongs to the same Product
- exactly one Inventory per ProductVariant
- exactly one initial ENTRY movement per Inventory
- initial movement delta equals initial quantityOnHand

## Seed media

Media records use logical local paths such as:

`/images/catalog/...`

PASSO 19 defines the data contract only.

Final visual assets will be produced or connected during Storefront work.

## Mutable state boundary

The immutable baseline does not seed:

- Cart
- Order

Cart and Order are runtime/demo state and will be created through repositories/use cases later.

## Quality Gate

Latest evidence:

- PASSO 19 targeted tests: 12/12
- complete suite: 144/144
- 18 test files passed
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 19:

`CODAL-DEC-001 -> CODAL-DEC-081`

Next available decision:

`CODAL-DEC-082`

## Next step

PASSO 20 - Local Repository Implementations.