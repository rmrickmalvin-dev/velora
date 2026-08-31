# VELORA Release

## BUILD 06 status

PASSO 47 prepares a provider-neutral local Release Candidate.

The application is not deployed by this pass.

Current external release inputs are intentionally unresolved:

- Git remote
- branch upstream
- deployment provider
- real public deployment origin
- remote CI execution
- production smoke validation

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

`NEXT_PUBLIC_SITE_URL` must be the exact public HTTP or HTTPS origin of the deployed application.

Examples of valid shape:

```text
https://your-real-deployment-host
```

Do not commit a fake origin into `.env.example`.

The committed template remains:

```text
NEXT_PUBLIC_SITE_URL=
```

When the real deployment exists, configure the variable in the deployment environment.

This activates the absolute sitemap origin while preserving the existing robots and sitemap contracts.

## Deployment provider

PASSO 47 does not select Vercel, Netlify, GitHub Pages or another provider without evidence.

The current application keeps the standard Next.js build contract:

```text
next build
next start
```

There is no `output: "export"`, `basePath` or `assetPrefix` release contract.

A deployment provider must therefore be selected deliberately in the deployment pass.

## Git and CI

Local quality is authoritative until a remote repository exists.

The existing GitHub Actions Quality workflow is prepared but cannot be described as remotely passing until:

1. a GitHub remote exists
2. the branch is pushed
3. the workflow actually runs successfully

## Line endings

The repository now declares:

```gitattributes
* text=auto eol=lf
```

This prevents machine-level `core.autocrlf` settings from defining project policy.

PASSO 47 does not mass-renormalize historical files.

## Final production validation

After deployment, verify at minimum:

- `/pt-BR`
- `/en`
- `/es`
- locale switching
- catalog and product routes
- cart
- checkout demo flow
- customer demo flow
- admin demo flow
- `/robots.txt`
- `/sitemap.xml`
- public metadata
- responsive behavior
- browser accessibility
- production console/network health

BUILD 06 remains IN PROGRESS until these external release checks are completed.