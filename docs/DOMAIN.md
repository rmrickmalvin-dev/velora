# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 04 status

IN PROGRESS

## Demo session boundary

Guest / Customer / Admin are experience roles in the Feature/UI layer.

They are not Domain authentication identities.

## Session persistence

Demo role state is small UI/session state.

It is persisted through a dedicated browser adapter using localStorage.

It is intentionally separate from:

- IndexedDB Domain persistence
- Cart
- Orders
- Catalog
- Inventory

## Role access

`canAccessDemoRoleArea`

controls which demo workspace content is rendered.

It must not be described as real authorization.

## Server rendering

The server snapshot is always:

`GUEST`

Client role state hydrates from browser storage through useSyncExternalStore.

## Next milestone

PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility.