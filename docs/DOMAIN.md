# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 01

CLOSED AND VALIDATED

## BUILD 02

CLOSED AND VALIDATED

## Storefront boundary

BUILD 02 proves the public UI can consume validated Application data without bypassing architecture.

Flow:

```text
Storefront UI
|
v
Presentation Models
|
v
VeloraApplication
|
v
Domain Repository Contracts
|
v
Infrastructure
```

## Navigation boundary

Responsive navigation is a UI concern.

Desktop uses a vertical rail.

Tablet/mobile uses a sticky top header.

No Domain or Application behavior depends on viewport size.

## Responsive boundary

Overflow, text wrapping, touch targets and layout breakpoints remain Presentation/Design System concerns.

## BUILD 03 boundary

BUILD 03 may activate browser-persistent commerce interaction through the existing composition root.

The UI still must not access IndexedDB directly.

Use:

`createBrowserVeloraRuntime`

from a client-safe composition boundary.

## Next milestone

PASSO 29 - Browser Runtime, Cart Experience State and Add-to-Cart Integration.