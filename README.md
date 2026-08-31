This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Quality and CI

Validated local runtime:

```text
Node 24.13.0
npm 11.6.2
```

Local complete quality gate:

```bash
npm ci
npx playwright install chromium
npm run quality
```

GitHub Actions uses the same Node version from `.nvmrc`, aligns npm to `11.6.2`, installs Chromium and runs `npm run quality`.

Release origin:

```text
NEXT_PUBLIC_SITE_URL
```

Keep it empty during conceptual/local development. BUILD 06 must provide the real deployed HTTP or HTTPS origin before production release validation.

## Release Candidate

BUILD 06 release commands:

```bash
npm run release:preflight
npm run release:candidate
npm run release:deploy-check
```

`release:preflight` validates the local provider-neutral release contract.

`release:deploy-check` is intentionally strict and remains blocked until a real Git remote, upstream branch and `NEXT_PUBLIC_SITE_URL` exist.

See `docs/RELEASE.md` for the production handoff.
