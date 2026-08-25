# DECISIONS â€” VELORA

Ãšltima atualizaÃ§Ã£o: 2026-08-24

## Objetivo

Este documento representa o Registro Oficial de DecisÃµes da VELORA.

DecisÃµes aceitas nÃ£o devem ser apagadas silenciosamente.

Quando uma decisÃ£o precisar mudar:

1. preservar a decisÃ£o original;
2. registrar uma nova decisÃ£o;
3. marcar a anterior como SUPERADA;
4. indicar qual decisÃ£o a substituiu;
5. documentar a justificativa;
6. revalidar os gates afetados.

## Status possÃ­veis

- PROPOSTA
- ACEITA
- SUPERADA
- REJEITADA

## Registro Oficial de DecisÃµes

| ID | Status | DecisÃ£o | RazÃ£o |
| --- | --- | --- | --- |
| CODAL-DEC-001 | ACEITA | A navegaÃ§Ã£o principal da VELORA seguirÃ¡ estrutura vertical convencional de e-commerce | Preservar previsibilidade, escaneabilidade e familiaridade para usuÃ¡rios de comÃ©rcio eletrÃ´nico |
| CODAL-DEC-002 | ACEITA | O sistema possuirÃ¡ trÃªs papÃ©is conceituais: GUEST, CUSTOMER e ADMIN | Demonstrar uma experiÃªncia completa baseada em papÃ©is sem misturar responsabilidades |
| CODAL-DEC-003 | ACEITA | O papel ativo modifica globalmente as aÃ§Ãµes e capacidades disponÃ­veis na experiÃªncia | Permitir que storefront e Ã¡reas operacionais reajam de forma consistente ao contexto do usuÃ¡rio |
| CODAL-DEC-004 | ACEITA | ADMIN poderÃ¡ utilizar a prÃ³pria Storefront com controles contextuais discretos de ediÃ§Ã£o e operaÃ§Ã£o | Demonstrar administraÃ§Ã£o integrada sem criar uma experiÃªncia visual desconectada do produto pÃºblico |
| CODAL-DEC-005 | ACEITA | A persistÃªncia local permanecerÃ¡ desacoplada da UI | Permitir substituiÃ§Ã£o futura do provider sem reconstruir componentes React |
| CODAL-DEC-006 | ACEITA | A VELORA nÃ£o realizarÃ¡ pagamento real durante a versÃ£o conceitual de portfÃ³lio | Evitar simulaÃ§Ã£o enganosa de transaÃ§Ãµes financeiras e manter o checkout demonstrativo |
| CODAL-DEC-007 | ACEITA | PT-BR, EN e ES fazem parte da arquitetura desde o inÃ­cio | Evitar internacionalizaÃ§Ã£o tardia e garantir paridade estrutural entre idiomas |
| CODAL-DEC-008 | ACEITA | A identidade visual utilizarÃ¡ Pearl + Champagne como direÃ§Ã£o principal | Criar uma estÃ©tica tecnolÃ³gica, sofisticada e premium sem copiar diretamente outras marcas |
| CODAL-DEC-009 | ACEITA | UI e Data Provider permanecerÃ£o separados por contratos e camadas | Permitir evoluÃ§Ã£o de dados locais para API, Supabase ou PostgreSQL sem acoplamento da apresentaÃ§Ã£o |
| CODAL-DEC-010 | ACEITA | OperaÃ§Ãµes administrativas relevantes deverÃ£o possuir feedback e confirmaÃ§Ã£o apropriados | Reduzir erros operacionais e tornar aÃ§Ãµes administrativas compreensÃ­veis |
| CODAL-DEC-011 | ACEITA | A identidade oficial do projeto serÃ¡ VELORA | Consolidar uma marca prÃ³pria, memorÃ¡vel e adequada ao posicionamento tecnolÃ³gico premium |
| CODAL-DEC-012 | ACEITA | O catÃ¡logo inicial utilizarÃ¡ produtos, marcas e dados fictÃ­cios | Permitir liberdade criativa para portfÃ³lio sem sugerir uma operaÃ§Ã£o comercial real |
| CODAL-DEC-013 | ACEITA | O estado inicial utilizarÃ¡ Seed imutÃ¡vel combinado com overrides locais | Preservar uma baseline confiÃ¡vel e permitir alteraÃ§Ãµes demonstrativas sem destruir os dados originais |
| CODAL-DEC-014 | ACEITA | IndexedDB serÃ¡ o mecanismo preferencial para dados mutÃ¡veis de domÃ­nio na implementaÃ§Ã£o local | Suportar persistÃªncia estruturada e maior volume de dados sem acoplar o domÃ­nio ao navegador |
| CODAL-DEC-015 | ACEITA | Zustand serÃ¡ utilizado somente para estado global de experiÃªncia quando houver necessidade comprovada | Evitar transformar Zustand em substituto das regras de domÃ­nio ou dos repositories |
| CODAL-DEC-016 | ACEITA | Vercel serÃ¡ o primeiro alvo pÃºblico de deploy | Manter alinhamento direto com Next.js e reduzir complexidade inicial de publicaÃ§Ã£o |
| CODAL-DEC-017 | ACEITA | A base visual utilizarÃ¡ CSS moderno + CSS Modules + Design Tokens | Manter controle explÃ­cito do Design System, performance e identidade sem dependÃªncia inicial de Tailwind |
| CODAL-DEC-018 | ACEITA | Storefront e Admin utilizarÃ£o o mesmo Design System | Preservar consistÃªncia visual e reduzir duplicaÃ§Ã£o entre experiÃªncias pÃºblicas e administrativas |
| CODAL-DEC-019 | ACEITA | VersÃµes de runtime e dependÃªncias principais serÃ£o fixadas e registradas durante BUILD 01 | Tornar instalaÃ§Ã£o, debugging, CI e evoluÃ§Ã£o do projeto mais previsÃ­veis |
| CODAL-DEC-020 | ACEITA | URLs localizadas e troca de idioma deverÃ£o preservar o contexto equivalente da jornada | Evitar que a mudanÃ§a de idioma reinicie desnecessariamente a navegaÃ§Ã£o do usuÃ¡rio |
| CODAL-DEC-021 | ACEITA | Domain nÃ£o depende de React ou Next.js | Preservar regras centrais fora da UI |
| CODAL-DEC-022 | ACEITA | Product e ProductVariant sÃ£o entidades distintas | VariaÃ§Ãµes possuem SKU, preÃ§o e estoque prÃ³prios |
| CODAL-DEC-023 | ACEITA | Estoque Ã© controlado por variante | Quantidades precisam representar a unidade vendÃ¡vel real |
| CODAL-DEC-024 | ACEITA | Inventory e InventoryMovement sÃ£o conceitos separados | Estado atual e histÃ³rico possuem responsabilidades diferentes |
| CODAL-DEC-025 | ACEITA | OrderItem preserva snapshot comercial | HistÃ³rico nÃ£o pode mudar com alteraÃ§Ãµes futuras do catÃ¡logo |
| CODAL-DEC-026 | ACEITA | Valores monetÃ¡rios usam menor unidade da moeda | Reduzir erros de precisÃ£o e tornar cÃ¡lculos determinÃ­sticos |
| CODAL-DEC-027 | ACEITA | Repository Contracts nÃ£o conhecem providers | Permitir troca de persistÃªncia sem reconstruir Application ou UI |
| CODAL-DEC-028 | ACEITA | Componentes nÃ£o acessam persistÃªncia de domÃ­nio diretamente | Evitar acoplamento entre UI e infraestrutura |
| CODAL-DEC-029 | ACEITA | Money Ã© representado por minorUnits + CurrencyCode | Evitar ambiguidade e erros de precisÃ£o monetÃ¡ria |
| CODAL-DEC-030 | ACEITA | FormataÃ§Ã£o monetÃ¡ria nÃ£o pertence ao Domain | Locale e apresentaÃ§Ã£o nÃ£o devem contaminar regras centrais |
| CODAL-DEC-031 | ACEITA | Percentuais aguardam polÃ­tica explÃ­cita de arredondamento | NÃ£o introduzir arredondamento financeiro silencioso |
| CODAL-DEC-032 | ACEITA | SKU e Entity ID sÃ£o conceitos distintos | Identidade tÃ©cnica e identidade operacional possuem responsabilidades diferentes |
| CODAL-DEC-033 | ACEITA | Testes unitÃ¡rios de domÃ­nio utilizam Vitest | Regras centrais precisam de prova automatizada desde o BUILD 01 |
| CODAL-DEC-034 | ACEITA | Slug serÃ¡ um Value Object reutilizÃ¡vel de Domain, com normalizaÃ§Ã£o e validaÃ§Ã£o centralizadas | Evitar duplicaÃ§Ã£o de regra de URL em entidades |
| CODAL-DEC-035 | ACEITA | ProductCategory, Product, ProductVariant e ProductMedia sÃ£o conceitos separados do Catalog Domain | Preservar responsabilidade Ãºnica e evoluÃ§Ã£o independente |
| CODAL-DEC-036 | ACEITA | SKU pertence a ProductVariant, nÃ£o ao Product genÃ©rico | SKU identifica a unidade comercial vendÃ¡vel |
| CODAL-DEC-037 | ACEITA | ProductVariant rejeita preÃ§o negativo, enquanto Money fundamental pode representar valores negativos | Separar regra matemÃ¡tica fundamental de regra comercial |
| CODAL-DEC-038 | ACEITA | Catalog Domain permanece independente de Inventory; Product e ProductVariant nÃ£o armazenam quantidade ou stock | Evitar acoplamento entre catÃ¡logo e estado de estoque |
| CODAL-DEC-039 | ACEITA | ProductMedia pertence obrigatoriamente a Product e pode opcionalmente referenciar ProductVariant | Suportar mÃ­dia geral e mÃ­dia especÃ­fica por variante |
| CODAL-DEC-040 | ACEITA | ProductVariant utiliza attributes genÃ©ricos e imutÃ¡veis | Suportar categorias distintas sem remodelar a entidade central |
| CODAL-DEC-041 | ACEITA | ConteÃºdo canÃ´nico pode existir no Domain, mas localizaÃ§Ã£o da experiÃªncia nÃ£o cria dependÃªncia de src/i18n | Preservar independÃªncia entre domÃ­nio e apresentaÃ§Ã£o localizada |

## DecisÃµes por Ã¡rea

### ExperiÃªncia e Produto

- CODAL-DEC-001 â€” navegaÃ§Ã£o vertical convencional;
- CODAL-DEC-002 â€” GUEST, CUSTOMER e ADMIN;
- CODAL-DEC-003 â€” role modifica a experiÃªncia global;
- CODAL-DEC-004 â€” Admin possui controles contextuais na Storefront;
- CODAL-DEC-006 â€” nenhum pagamento real;
- CODAL-DEC-010 â€” feedback e confirmaÃ§Ã£o para operaÃ§Ãµes administrativas;
- CODAL-DEC-011 â€” identidade VELORA;
- CODAL-DEC-012 â€” catÃ¡logo fictÃ­cio inicial.

### InternacionalizaÃ§Ã£o

- CODAL-DEC-007 â€” PT-BR, EN e ES desde o inÃ­cio;
- CODAL-DEC-020 â€” locale preserva contexto equivalente da jornada.

### Design System

- CODAL-DEC-008 â€” Pearl + Champagne;
- CODAL-DEC-017 â€” CSS + CSS Modules + Design Tokens;
- CODAL-DEC-018 â€” Storefront e Admin compartilham Design System.

### Arquitetura e PersistÃªncia

- CODAL-DEC-005 â€” persistÃªncia desacoplada da UI;
- CODAL-DEC-009 â€” UI e Data Provider separados;
- CODAL-DEC-013 â€” Seed imutÃ¡vel + overrides locais;
- CODAL-DEC-014 â€” IndexedDB para domÃ­nio mutÃ¡vel;
- CODAL-DEC-015 â€” Zustand apenas para estado global necessÃ¡rio;
- CODAL-DEC-021 â€” Domain independente de React e Next.js;
- CODAL-DEC-027 â€” Repository Contracts independentes de providers;
- CODAL-DEC-028 â€” componentes nÃ£o acessam persistÃªncia diretamente.

### Runtime e Deploy

- CODAL-DEC-016 â€” Vercel como primeiro alvo pÃºblico;
- CODAL-DEC-019 â€” versÃµes registradas durante BUILD 01.

### CatÃ¡logo e Estoque

- CODAL-DEC-022 â€” Product e ProductVariant separados;
- CODAL-DEC-023 â€” estoque por variante;
- CODAL-DEC-024 â€” Inventory e InventoryMovement separados;
- CODAL-DEC-032 â€” SKU e Entity ID separados.

### Pedidos

- CODAL-DEC-025 â€” OrderItem preserva snapshot comercial.

### Dinheiro e Pricing

- CODAL-DEC-026 â€” valores monetÃ¡rios usam menor unidade da moeda;
- CODAL-DEC-029 â€” Money utiliza minorUnits + CurrencyCode;
- CODAL-DEC-030 â€” formataÃ§Ã£o monetÃ¡ria fora do Domain;
- CODAL-DEC-031 â€” percentuais aguardam polÃ­tica explÃ­cita de arredondamento.

### Qualidade

- CODAL-DEC-033 â€” Vitest Ã© o test runner unitÃ¡rio do Domain.

### Catalog Domain â€” PASSO 14

- CODAL-DEC-034 â€” Slug como Value Object reutilizÃ¡vel;
- CODAL-DEC-035 â€” entidades do Catalog Domain separadas;
- CODAL-DEC-036 â€” SKU pertence a ProductVariant;
- CODAL-DEC-037 â€” ProductVariant.price nÃ£o negativo;
- CODAL-DEC-038 â€” Catalog separado de Inventory;
- CODAL-DEC-039 â€” ProductMedia ligada a Product e opcionalmente Variant;
- CODAL-DEC-040 â€” attributes de Variant genÃ©ricos e imutÃ¡veis;
- CODAL-DEC-041 â€” Domain independente de src/i18n.
## Regras de continuidade

Uma IA ou desenvolvedor que continuar a VELORA deve:

- ler este documento antes de propor mudanÃ§as arquiteturais;
- nÃ£o substituir decisÃµes ACEITAS silenciosamente;
- verificar se uma nova implementaÃ§Ã£o contradiz alguma decisÃ£o existente;
- registrar novas decisÃµes com numeraÃ§Ã£o sequencial;
- utilizar o prÃ³ximo nÃºmero disponÃ­vel apÃ³s CODAL-DEC-041;
- preservar decisÃµes histÃ³ricas mesmo quando forem superadas.

## PrÃ³xima decisÃ£o disponÃ­vel

CODAL-DEC-042