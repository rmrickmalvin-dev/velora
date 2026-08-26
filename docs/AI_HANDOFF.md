# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

Next:

BUILD 03 - Commerce Interaction

## BUILD 02 closure

Record:

`docs/BUILD_02_CLOSURE.md`

Final evidence:

```text
PASSO 28 targeted: 14/14
Full suite:         297/297
Test files:         38/38
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Navigation contract

Desktop:

- fixed vertical rail

Tablet/mobile:

- sticky top header

Do not replace the desktop vertical navigation with a horizontal desktop header unless a new official decision explicitly changes the requirement.

## Public route contract

Home:

`/{locale}`

Category:

`/{locale}/categories/{category}`

Product:

`/{locale}/products/{slug}`

## BUILD 03 start rule

Browser commerce interaction must use the existing Infrastructure composition root.

Use:

`createBrowserVeloraRuntime`

from client-safe code.

Do not:

- access IndexedDB from components
- access localStorage for Domain persistence
- duplicate Cart rules in UI
- mutate Inventory from add-to-cart

## Next decision

`CODAL-DEC-155`

## Next action

PASSO 29 - Browser Runtime, Cart Experience State and Add-to-Cart Integration.

Expected focus:

- client-safe runtime provider
- Cart experience state
- add-to-cart from Product detail
- cart count
- persistence across reloads
- accessible feedback
- no payment flow yet