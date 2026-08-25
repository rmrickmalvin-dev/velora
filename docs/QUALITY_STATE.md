# QUALITY STATE â€” VELORA

Ãšltima atualizaÃ§Ã£o: 2026-08-25

## BUILD 01

Status: EM EXECUÃ‡ÃƒO

## Unidade 01A â€” Bootstrap + Locale Foundation

Status: CONCLUÃDA, VALIDADA E VERSIONADA

- [x] runtime e dependÃªncias registrados
- [x] Next.js App Router + TypeScript
- [x] PT-BR, EN e ES
- [x] `/` â†’ `/pt-BR`
- [x] locale switcher e pathname preservation
- [x] metadata e `html lang` localizados
- [x] responsive baseline
- [x] accessibility baseline
- [x] reduced motion
- [x] production build

## Unidade 01B â€” Domain Foundation

Status: EM EXECUÃ‡ÃƒO

### Architecture

- [x] Domain/Application/Infrastructure/UI boundaries
- [x] Repository Contracts independentes de provider
- [x] UI sem acesso direto Ã  persistÃªncia
- [x] Domain sem React/Next/Zustand/DOM/CSS/localStorage/IndexedDB/Supabase/fetch

### Fundamental Domain

- [x] DomainValidationError
- [x] CurrencyCode
- [x] Money
- [x] SKU
- [x] Slug
- [x] Entity IDs
- [x] roles/statuses

## PASSO 14 â€” Catalog Domain

Status: TECNICAMENTE VALIDADO

### ProductCategory

- [x] identity
- [x] slug
- [x] canonical name
- [x] optional description
- [x] invariants
- [x] immutable result
- [x] tests

### Product

- [x] identity
- [x] slug/name/brand/model
- [x] category relation
- [x] status/featured
- [x] runtime status validation
- [x] sem Inventory
- [x] sem Infrastructure
- [x] tests

### ProductVariant

- [x] Product relation
- [x] SKU ownership
- [x] Money price
- [x] preÃ§o nÃ£o negativo
- [x] generic immutable attributes
- [x] status validation
- [x] sem inventory quantity
- [x] tests

### ProductMedia

- [x] Product relation
- [x] optional ProductVariant relation
- [x] URL
- [x] alt
- [x] non-negative safe-integer position
- [x] tests

## Test Evidence

PASSO 13 baseline: 18/18.

PASSO 14 isolado: 28/28.

SuÃ­te atual:

```text
8 test files
46 tests
46 passed
0 failed
```

## Ãšltimo Technical Gate

Data: 2026-08-25

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run check`
- [x] `/pt-BR` SSG
- [x] `/en` SSG
- [x] `/es` SSG
- [x] Proxy reconhecido

## Pendente na Unidade 01B

- [ ] Inventory
- [ ] InventoryMovement
- [ ] Cart
- [ ] CartItem
- [ ] Order
- [ ] OrderItem
- [ ] Repository Contracts
- [ ] Seed Foundation
- [ ] IndexedDB provider
- [ ] local repositories

## PrÃ³ximo gate

PASSO 15 â€” Inventory + InventoryMovement.

DeverÃ¡ provar estoque por variante, quantidade segura, movimentos explÃ­citos, independÃªncia de Infrastructure e regressÃ£o dos 46 testes existentes.