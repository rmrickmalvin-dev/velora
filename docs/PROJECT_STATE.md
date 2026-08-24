# PROJECT STATE — VELORA

Última atualização: 2026-08-24

## Projeto

VELORA

## Fase

BUILD 01 — Foundation

## Unidade atual

01A — Bootstrap + Locale Foundation

## Estado

EM VALIDAÇÃO

## Último ponto válido

A fundação inicial foi implementada contendo:

- Next.js App Router;
- TypeScript;
- locale routing;
- PT-BR, EN e ES;
- Design Tokens;
- identidade Pearl + Champagne;
- Manrope;
- IBM Plex Mono;
- metadata localizada;
- Locale Switcher;
- Foundation Page responsiva;
- Proxy de locale.

## Runtime comprovado

Node.js: 24.13.0
npm: 11.6.2

## Dependências principais comprovadas

Next.js: 16.3.1
React: 19.2.8
React DOM: 19.2.8
TypeScript: 5.9.3
ESLint: 9.39.5

## Contrato de locale

Locales:

- pt-BR
- en
- es

Default:

- pt-BR

Comportamento:

- / redireciona para /pt-BR;
- troca de idioma preserva pathname equivalente.

## Próxima prova

Executar:

npm run lint
npm run typecheck
npm run build
npm run check

## Próxima unidade após aprovação

BUILD 01 / 01B

Domain Contracts
Repository Architecture
Seed Foundation
Test Infrastructure