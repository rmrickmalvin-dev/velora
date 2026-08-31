# STACK — VELORA

Última atualização: 2026-08-24

## Runtime

Node.js: 24.13.0
npm: 11.6.2

## Core

Next.js: 16.3.1
React: 19.2.8
React DOM: 19.2.8
TypeScript: 5.9.3
ESLint: 9.39.5
React Compiler: ativo

## Framework

Next.js App Router

## Routing

Locale por rota:

- /pt-BR
- /en
- /es

Locale padrão:

- / -> /pt-BR

## Styling

- CSS moderno
- CSS Modules
- CSS Custom Properties
- Design Tokens
- identidade Pearl + Champagne
- Tailwind CSS não utilizado

## Tipografia

Interface:

- Manrope

Dados técnicos:

- IBM Plex Mono

## Internacionalização

Contrato central:

src/i18n/config.ts

Conteúdo foundation:

src/i18n/messages.ts

## Package Manager

npm

package-lock.json é parte da fonte de verdade das dependências.

## Unit Testing

Vitest: 4.1.11

Responsabilidade atual:

- Domain Value Objects
- Domain Rules
- Application Rules futuramente

Scripts:

- `npm run test`
- `npm run test:watch`

Quality Gate agregado:

`npm run check`

Executa:

lint
→ typecheck
→ unit tests
→ production build

Última evidência comprovada:

- 3 test files passed;
- 18 testes passaram;
- 0 testes falharam;
- ESLint aprovado;
- TypeScript aprovado;
- Production Build aprovado;
- Aggregated Check aprovado.

## Deploy Target

Vercel.

## Estado

BUILD 01 em execução.

## PASSO 45 SEO Runtime Infrastructure

No new dependency was introduced.

Public metadata remains inside the Next App Router metadata system.

Added:

- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/lib/site-origin.ts`

Deployment origin contract:

```text
NEXT_PUBLIC_SITE_URL
```

The value must be an absolute HTTP or HTTPS deployment origin.

If the variable is absent or invalid:

- no fake production host is invented
- sitemap returns no absolute public entries
- robots remains valid and does not advertise a false sitemap origin

BUILD 06 Release is responsible for supplying and validating the real deployed origin.

## PASSO 46 CI and Reproducibility Contract

Validated versions:

```text
Node 24.13.0
npm 11.6.2
```

Reproducible install:

```text
npm ci
```

Canonical gate:

```text
npm run quality
```

CI provider: GitHub Actions.
CI browser: Playwright Chromium.

The workflow does not define a fake production value for `NEXT_PUBLIC_SITE_URL`.
BUILD 06 must provide the real deployment origin when release validation begins.

## PASSO 46 ESLint and Git Integrity Compatibility Note

VELORA retains:

```text
package.json ESLint contract: ^9
package-lock ESLint resolution: 9.39.5
eslint-config-next: 16.3.1
```

ESLint 10.9.1 was evaluated before BUILD 06 and rejected because the current lint stack reaches eslint-plugin-react code that still calls the removed ESLint 10 `context.getFilename()` API.

For tracked lockfile integrity on Windows, use Git-normalized identity and `git diff`, not a raw working-tree SHA256 alone. CRLF/LF checkout normalization can change raw bytes without changing the tracked Git content.

Upgrade ESLint only when the complete Next / React lint stack passes the canonical zero-warning gate without compatibility shims.
