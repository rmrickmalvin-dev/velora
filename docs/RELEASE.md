# VELORA Release

## BUILD 06 status

BUILD 06 - Release is CLOSED AND VALIDATED.

PASSO 48 completed the external release contract.

Current production evidence:

- Git remote: `https://github.com/rmrickmalvin-dev/velora.git`
- upstream: `origin/master`
- application-bearing release SHA: `001f393727a32039898c2c575db68e9321660a34`
- GitHub Actions Quality: completed / success
- deployment provider: Vercel
- project: `velora`
- framework: Next.js
- deployment source: Git
- production deployment: READY
- canonical public origin: `https://velora-nine-delta.vercel.app`
- production smoke: PASS

## Release commands

Local Release Candidate validation:

```bash
npm run release:candidate
```

Fast local release-contract inspection:

```bash
npm run release:preflight
```

Strict deploy gate:

```bash
npm run release:deploy-check
```

The strict deploy gate requires:

- a clean Git working tree
- a configured Git remote
- a configured upstream branch
- a real `NEXT_PUBLIC_SITE_URL`

## Production origin

The canonical public origin is:

```text
https://velora-nine-delta.vercel.app
```

Vercel Production configures:

```text
NEXT_PUBLIC_SITE_URL=https://velora-nine-delta.vercel.app
```

The committed template intentionally remains:

```text
NEXT_PUBLIC_SITE_URL=
```

This preserves source portability while enabling real production robots and sitemap discovery through the deployment environment.

## Deployment provider

Vercel is the validated production provider for this release.

Validated project facts:

- project: `velora`
- framework preset: Next.js
- Git integration: `rmrickmalvin-dev/velora`
- production branch: `master`
- deployment source: Git
- public SSO protection: disabled
- production deployment for release SHA `001f393`: READY

The standard Next.js build contract remains unchanged:

```text
next build
next start
```

No static-export, `basePath` or `assetPrefix` release contract was introduced.

## Git and CI

The production repository is:

```text
https://github.com/rmrickmalvin-dev/velora
```

Release branch:

```text
master -> origin/master
```

GitHub Actions Quality executed remotely for application-bearing release SHA `001f393727a32039898c2c575db68e9321660a34` and completed successfully.

Local and remote quality remain aligned to Node 24.13.0, npm 11.6.2, `npm ci`, Playwright Chromium and the canonical `npm run quality` workflow.

## Line endings

The repository now declares:

```gitattributes
* text=auto eol=lf
```

This prevents machine-level `core.autocrlf` settings from defining project policy.

PASSO 47 does not mass-renormalize historical files.

## Final production validation

Completed production validation:

- [x] root redirects to `/pt-BR`
- [x] `/pt-BR`
- [x] `/en`
- [x] `/es`
- [x] representative Product route
- [x] `/robots.txt`
- [x] `/sitemap.xml`
- [x] canonical production origin in robots and sitemap
- [x] GitHub Actions Quality success
- [x] Vercel production deployment READY
- [x] no runtime errors observed during the verification window

PASSO 48D also ran `npm run release:deploy-check` with the real production origin and validated Node, npm, package privacy, Quality contract, environment template, LF policy, origin, Git remote, upstream and clean working tree.

The release-readiness script intentionally remains provider-neutral. Its provider WAIT line is informational; Vercel selection and deployment state are external evidence documented here.

BUILD 06 - Release is CLOSED AND VALIDATED.

## Direct preflight execution

The readiness script supports both invocation modes:

```bash
npm run release:preflight
node scripts/release-readiness.mjs
```

The npm version check first uses npm lifecycle metadata when available.

When invoked directly, it falls back to the system PATH. On Windows the fallback uses `cmd.exe` so the npm command shim is resolved correctly.

Both modes enforce npm `11.6.2`.
