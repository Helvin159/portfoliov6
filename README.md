# Portfolio

Helvin Rymer's portfolio site, rebuilt with Next.js App Router, React, TypeScript,
Payload CMS, MongoDB Atlas, and Firebase Storage.

## Development

Use `pnpm` for all project commands.

```sh
pnpm install
pnpm dev
```

The public site runs at `/`. Payload admin runs at `/admin`.

## Useful Commands

```sh
pnpm generate:types
pnpm generate:importmap
pnpm typecheck
pnpm test
pnpm build
```

Migration commands:

```sh
pnpm migration:export:firestore
pnpm migration:validate
pnpm migration:import -- --dry-run
pnpm migration:import
```

## Deployment

See [Deployment and Operations Runbook](docs/deployment.md) for MongoDB Atlas setup, Firebase
setup, environment variables, admin workflow, rollback/export steps, and hosting assumptions.
