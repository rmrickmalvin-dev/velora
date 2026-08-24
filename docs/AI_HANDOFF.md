# AI HANDOFF — VELORA

Última atualização: 2026-08-24

CODAL OS — Complete Edition ativo.

## Projeto

VELORA

## Fase

BUILD 01 — Foundation

## Unidade atual

01B — Domain Contracts + Repository Architecture + Seed Foundation + Test Infrastructure

## Estado

EM EXECUÇÃO

## Último checkpoint concluído

BUILD 01 / Unidade 01A — Bootstrap + Locale Foundation

Status:

CONCLUÍDA, VALIDADA E VERSIONADA EM GIT.

## Último ponto técnico comprovado

BUILD 01 / Unidade 01B possui os primeiros contratos executáveis do Domain.

Implementados:

- Fundamental Types;
- UserRole;
- ProductStatus;
- OrderStatus;
- InventoryMovementType;
- PromotionStatus;
- DomainValidationError;
- CurrencyCode;
- Money;
- SKU.

## Arquitetura

Direção oficial:

UI
↓
Application
↓
Domain Contracts
↑
Infrastructure

## Regras de dependência

Domain não depende de:

- React;
- Next.js;
- Zustand;
- DOM;
- localStorage;
- IndexedDB;
- Supabase;
- fetch;
- CSS;
- providers externos.

A UI não acessa persistência de domínio diretamente.

Repository Contracts permanecem independentes do provider.

## Decisões centrais já aceitas

- Product e ProductVariant são entidades distintas;
- estoque pertence à variante;
- Inventory e InventoryMovement possuem responsabilidades distintas;
- Cart e Order são conceitos distintos;
- OrderItem preservará snapshot comercial;
- User e CustomerProfile são conceitos distintos;
- Money utiliza minor units + CurrencyCode;
- formatação monetária permanece fora do Domain;
- percentuais exigem política explícita de arredondamento;
- SKU e Entity ID são conceitos distintos;
- testes unitários de domínio utilizam Vitest.

Consultar `docs/DECISIONS.md` antes de substituir qualquer decisão existente.

## Money

Money utiliza:

- `minorUnits`;
- `CurrencyCode`;
- safe integers;
- operações imutáveis.

Suporta:

- soma;
- subtração;
- multiplicação por quantidade inteira;
- comparação;
- igualdade;
- resultados negativos.

Rejeita:

- minor units fracionários;
- multiplicadores fracionários;
- operações entre moedas incompatíveis.

Money negativo é permitido no Value Object fundamental.

Preço negativo deverá ser proibido pela entidade ou contrato responsável por preço, não pelo Value Object Money.

## SKU

SKU possui:

- normalização;
- uppercase;
- hífens;
- validação de tamanho;
- validação de caracteres;
- identidade distinta do Entity ID.

Exemplo:

`vl_aster xp 256 gra`

→

`VL-ASTER-XP-256-GRA`

## Runtime comprovado

Node.js: 24.13.0

npm: 11.6.2

## Stack principal comprovada

Next.js: 16.3.1

React: 19.2.8

React DOM: 19.2.8

TypeScript: 5.9.3

ESLint: 9.39.5

Vitest: 4.1.11

## Quality Gate

Comando oficial:

`npm run check`

Pipeline atual:

lint
→ typecheck
→ unit tests
→ production build

Última evidência:

- ESLint aprovado;
- TypeScript aprovado;
- 3 test files passed;
- 18/18 testes unitários aprovados;
- 0 testes falharam;
- Production Build aprovado;
- `/pt-BR` SSG aprovado;
- `/en` SSG aprovado;
- `/es` SSG aprovado;
- Proxy reconhecido;
- Aggregated Check aprovado.

## Internacionalização

Locales:

- pt-BR;
- en;
- es.

Default:

- pt-BR.

Comprovado:

- `/` → `/pt-BR`;
- troca de locale funciona;
- pathname equivalente é preservado;
- `html lang` acompanha locale;
- metadata acompanha locale.

## Persistência

Ainda não implementada para o domínio comercial.

Direção aprovada:

UI
→ Application
→ Repository Contract
→ Infrastructure Provider

Planejado:

- seed imutável;
- overrides locais;
- IndexedDB para dados mutáveis;
- localStorage somente para estados pequenos apropriados.

Futuro:

- API;
- Supabase;
- PostgreSQL.

## Documentos que devem ser lidos antes de continuar

1. `docs/PROJECT_STATE.md`
2. `docs/DECISIONS.md`
3. `docs/STACK.md`
4. `docs/QUALITY_STATE.md`
5. `docs/DOMAIN.md`
6. `CHANGELOG.md`

## Próxima ação exata

Executar:

PASSO 14 — ProductCategory + Product + ProductVariant + ProductMedia

Implementar contratos de catálogo sem introduzir:

- Inventory dentro de Product;
- persistência;
- React;
- Next.js;
- Zustand;
- IndexedDB;
- Supabase.

Criar testes unitários para as invariantes do catálogo.

## Invariantes planejadas para o próximo passo

- Product possui identidade válida;
- Product possui slug válido;
- ProductVariant pertence a Product;
- SKU pertence à variante;
- preço da variante não pode ser negativo;
- ProductMedia possui estrutura previsível;
- ProductCategory possui identidade própria;
- catálogo permanece independente de Inventory;
- catálogo permanece independente de Infrastructure.

## Regra de continuidade

Não quebrar decisões aceitas silenciosamente.

Se uma decisão precisar mudar:

1. registrar evidência;
2. criar decisão sucessora;
3. marcar a anterior como superada;
4. documentar impacto;
5. validar novamente os gates relevantes.