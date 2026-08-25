# AI HANDOFF â€” VELORA

Ãšltima atualizaÃ§Ã£o: 2026-08-25

CODAL OS â€” Complete Edition ativo.

## Projeto

VELORA â€” e-commerce conceitual profissional de smartphones, acessÃ³rios e tecnologia mÃ³vel.

## Estado atual

BUILD 01 â€” Foundation

Unidade 01B â€” Domain Foundation

Ãšltimo passo tecnicamente validado: PASSO 14 â€” Catalog Domain.

## Ãšltimo checkpoint Git anterior

`90f2d42` â€” `feat: add domain primitives and unit test foundation`

Novo checkpoint serÃ¡ criado apÃ³s sincronizaÃ§Ã£o documental do PASSO 14.

## Stack

Node 24.13.0; npm 11.6.2; Next.js 16.3.1; React 19.2.8; React DOM 19.2.8; TypeScript 5.9.3; ESLint 9.39.5; Vitest 4.1.11.

## Locales

PT-BR, EN e ES. `/` â†’ `/pt-BR`. Troca de locale preserva contexto equivalente.

## Arquitetura

```text
UI
â†“
Application
â†“
Domain Contracts
â†‘
Infrastructure
```

Domain nÃ£o depende de React, Next, Zustand, DOM, CSS, localStorage, IndexedDB, Supabase ou fetch.

## Domain implementado

Value Objects: CurrencyCode, Money, SKU, Slug.

Catalog: ProductCategory, Product, ProductVariant, ProductMedia.

## Regras centrais

- Product e ProductVariant sÃ£o distintos;
- SKU pertence a ProductVariant;
- ProductVariant pertence a Product por productId;
- ProductVariant.price nÃ£o pode ser negativo;
- Money fundamental pode ser negativo;
- Product/ProductVariant nÃ£o armazenam estoque;
- Inventory serÃ¡ separado e referenciarÃ¡ ProductVariantId;
- ProductMedia sempre pertence a Product e pode opcionalmente referenciar Variant;
- `src/domain` nÃ£o importa `src/i18n`.

## Testes

Ãšltima suÃ­te:

```text
8 test files
46 tests
46 passed
0 failed
```

PASSO 14 isolado: 5 arquivos, 28/28.

## Quality Gate

`npm run check` = lint â†’ typecheck â†’ test â†’ build.

Ãšltimo gate: lint âœ…, typecheck âœ…, 46/46 âœ…, build âœ…, PT-BR/EN/ES SSG âœ…, Proxy âœ….

## DecisÃµes

ApÃ³s sincronizaÃ§Ã£o: `CODAL-DEC-001 â†’ CODAL-DEC-041`.

PrÃ³xima: `CODAL-DEC-042`.

## NÃ£o fazer

- nÃ£o colocar Inventory em Product;
- nÃ£o colocar stock em ProductVariant;
- nÃ£o acessar IndexedDB/localStorage diretamente na UI;
- nÃ£o importar React/Next no Domain;
- nÃ£o fundir Product e ProductVariant;
- nÃ£o transformar SKU em Entity ID;
- nÃ£o duplicar normalizaÃ§Ã£o de Slug;
- nÃ£o acoplar Repository Contract a provider.

## PrÃ³xima aÃ§Ã£o

PASSO 15 â€” Inventory + InventoryMovement.

Antes de codar, ler PROJECT_STATE, DECISIONS, DOMAIN, QUALITY_STATE, STACK e CHANGELOG.