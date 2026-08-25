# CHANGELOG â€” VELORA

Ãšltima atualizaÃ§Ã£o: 2026-08-24

## BUILD 01 â€” Foundation

### Unidade 01A â€” Bootstrap + Locale Foundation

Status: CONCLUÃDA, VALIDADA E VERSIONADA

#### Added

- runtime contract;
- Node.js e npm version contracts;
- `.nvmrc`;
- `engines` registrados em `package.json`;
- Next.js App Router foundation;
- TypeScript foundation;
- PT-BR, EN and ES locale contract;
- locale-aware root layout;
- `generateStaticParams`;
- localized metadata;
- localized `html lang`;
- locale switcher;
- pathname-preserving locale navigation;
- default locale redirect `/` â†’ `/pt-BR`;
- Proxy de locale;
- Pearl + Champagne Design Tokens;
- semantic color tokens;
- typography tokens;
- spacing tokens;
- radius tokens;
- shadow tokens;
- motion tokens;
- focus tokens;
- Manrope typography;
- IBM Plex Mono technical typography;
- responsive Foundation Page;
- responsive hero;
- decorative foundation visual;
- foundation status cards;
- global accessibility baseline;
- visible focus baseline;
- reduced-motion baseline;
- screen-reader-only utility;
- responsive locale selector;
- CODAL operational documentation.

#### Internationalization

Validated:

- `/` redirects to `/pt-BR`;
- `/pt-BR` works;
- `/en` works;
- `/es` works;
- locale switcher works;
- locale switcher preserves equivalent pathname;
- `html lang` follows the active locale;
- metadata follows the active locale.

#### Responsive Validation

Validated:

- 375px;
- 768px;
- 1024px;
- 1440px;
- no horizontal overflow.

#### Accessibility Validation

Validated:

- keyboard navigation;
- visible keyboard focus;
- semantic initial structure;
- accessible Locale Switcher naming;
- decorative flags hidden from assistive technologies;
- reduced-motion baseline.

#### Technical Validation

Passed:

- `npm run lint`;
- `npm run typecheck`;
- `npm run build`;
- `npm run check`.

Production build confirmed:

- `/pt-BR` generated via SSG;
- `/en` generated via SSG;
- `/es` generated via SSG;
- `generateStaticParams` recognized;
- Proxy recognized by Next.js.

#### Result

Unidade 01A approved as the first stable technical checkpoint of VELORA.

---

### Unidade 01B â€” Domain Foundation

Status: EM EXECUÃ‡ÃƒO

#### Architecture

Added:

- Domain boundary;
- Application boundary;
- Infrastructure boundary;
- UI boundary;
- repository abstraction contract;
- provider-independent repository direction;
- Product / ProductVariant separation;
- inventory architecture;
- Inventory / InventoryMovement separation;
- Cart / Order responsibility separation;
- order snapshot rule;
- User / CustomerProfile separation;
- Promotion responsibility boundary;
- Money minor-unit rule;
- SKU / Entity ID separation;
- dependency restrictions;
- `DOMAIN.md`.

Established dependency direction:

UI
â†’ Application
â†’ Domain Contracts
â† Infrastructure

Established Domain restrictions:

- Domain does not depend on React;
- Domain does not depend on Next.js;
- Domain does not depend on Zustand;
- Domain does not access DOM;
- Domain does not access localStorage;
- Domain does not access IndexedDB;
- Domain does not access Supabase;
- Domain does not use `fetch`;
- Domain does not depend on CSS;
- UI components do not access domain persistence directly.

#### Fundamental Types

Added:

- `UserRole`;
- `ProductStatus`;
- `OrderStatus`;
- `InventoryMovementType`;
- `PromotionStatus`;
- domain entity identifier types.

#### Domain Errors

Added:

- `DomainValidationError`;
- programmatic domain error codes;
- separation between machine-readable error code and human-readable error message.

#### CurrencyCode

Added:

- `CurrencyCode` Value Object;
- three-letter structural validation;
- trimming;
- uppercase normalization;
- `BRL` baseline constant;
- `CURRENCY_CODE_INVALID` validation error.

Established:

- structural support for currency codes does not imply multi-currency storefront support;
- locale and currency remain separate concerns.

#### Money

Added:

- `Money` Value Object;
- `minorUnits`;
- `CurrencyCode`;
- safe-integer validation;
- immutable Money objects;
- zero Money creation;
- currency-safe addition;
- currency-safe subtraction;
- integer multiplication;
- Money comparison;
- Money equality;
- negative-result support;
- negative-value inspection.

Validation rules:

- fractional minor units are rejected;
- incompatible currencies cannot participate in arithmetic;
- fractional multipliers are rejected;
- negative Money values are allowed at the fundamental Value Object level.

Established:

- product prices will apply their own non-negative invariant;
- monetary formatting remains outside Domain;
- percentage calculations require an explicit rounding policy before implementation.

#### SKU

Added:

- `SKU` Value Object;
- whitespace trimming;
- uppercase normalization;
- spaces converted to hyphens;
- underscores converted to hyphens;
- repeated separators collapsed;
- leading and trailing separators removed;
- minimum length validation;
- maximum length validation;
- supported-character validation;
- `SKU_LENGTH_INVALID` validation error;
- `SKU_FORMAT_INVALID` validation error.

Established:

- SKU is an operational/commercial identifier;
- SKU is not the same concept as an internal Entity ID.

#### Testing

Added:

- Vitest 4.1.11;
- `npm run test`;
- `npm run test:watch`;
- unit tests integrated into the aggregated Quality Gate;
- CurrencyCode unit tests;
- Money unit tests;
- SKU unit tests.

Current automated test coverage:

- CurrencyCode normalization;
- BRL baseline;
- invalid currency rejection;
- Money creation using minor units;
- fractional minor-unit rejection;
- same-currency addition;
- cross-currency operation rejection;
- negative Money results;
- integer Money multiplication;
- fractional multiplier rejection;
- zero Money creation;
- Money comparison;
- Money equality;
- SKU normalization;
- valid SKU preservation;
- empty SKU rejection;
- unsupported SKU character rejection;
- repeated separator normalization.

#### Test Evidence

Validated:

- 3 test files passed;
- 18 unit tests passed;
- 0 unit tests failed.

#### Technical Validation

Passed:

- `npm run lint`;
- `npm run typecheck`;
- `npm run test`;
- `npm run build`;
- `npm run check`.

Aggregated Quality Gate:

lint
â†’ typecheck
â†’ unit tests
â†’ production build

Latest validated result:

- ESLint passed;
- TypeScript passed;
- Vitest passed â€” 18/18;
- production build passed;
- `/pt-BR` SSG passed;
- `/en` SSG passed;
- `/es` SSG passed;
- Proxy recognized by Next.js;
- aggregated Quality Gate passed.

#### Documentation

Updated:

- `docs/PROJECT_STATE.md`;
- `docs/QUALITY_STATE.md`;
- `docs/STACK.md`;
- `docs/DOMAIN.md`;
- `docs/DECISIONS.md`;
- `docs/AI_HANDOFF.md`;
- `CHANGELOG.md`.

#### Current Result

The first executable Domain primitives are implemented and validated.

Completed in Unidade 01B so far:

- architecture boundaries;
- dependency rules;
- fundamental types;
- DomainValidationError;
- CurrencyCode;
- Money;
- SKU;
- Vitest foundation;
- 18/18 unit tests;
- aggregated Quality Gate.

#### Next

Implement Catalog Domain:

- ProductCategory;
- Product;
- ProductVariant;
- ProductMedia.

Required next validations:

- product identity invariants;
- slug invariants;
- ProductVariant â†’ Product relationship;
- SKU ownership by variant;
- non-negative variant price;
- predictable ProductMedia structure;
- ProductCategory identity;
- catalog independence from Inventory;
- catalog independence from Infrastructure;
- catalog unit tests;
- lint;
- typecheck;
- unit tests;
- production build;
- aggregated Quality Gate.
---

### PASSO 14 â€” Catalog Domain

Status: CONCLUÃDO E TECNICAMENTE VALIDADO

#### Added

- Slug Value Object;
- ProductCategory;
- Product;
- ProductVariant;
- ProductMedia;
- ProductCategoryId;
- ProductMediaId;
- generic immutable Variant attributes;
- Product/Variant media association.

#### Invariants

- slug normalization and validation;
- ProductCategory identity;
- Product identity/category/status;
- ProductVariant belongs to Product;
- SKU belongs to ProductVariant;
- ProductVariant price cannot be negative;
- attributes cannot contain empty keys/values;
- ProductMedia belongs to Product;
- ProductMedia may optionally target ProductVariant;
- ProductMedia position is non-negative safe integer;
- Catalog remains independent from Inventory and Infrastructure.

#### Testing

PASSO 14 isolated:

- 5 test files passed;
- 28 tests passed;
- 0 failed.

Complete suite:

- 8 test files passed;
- 46 tests passed;
- 0 failed.

#### Technical Validation

Passed:

- `npm run typecheck`;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npm run check`.

Production build confirmed PT-BR, EN and ES via SSG and Proxy recognized by Next.js.

#### Decisions

Added CODAL-DEC-034 through CODAL-DEC-041.

Next decision: CODAL-DEC-042.

#### Next

PASSO 15 â€” Inventory + InventoryMovement.