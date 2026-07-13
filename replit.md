# Legacy Pathways

Heritage platform (in planning) for preserving the stories and legacy of Māori servicemen connected with Ōhinemutu, Te Arawa and Muruika Urupā. Full build brief: `attached_assets/Pasted-Build-a-production-ready-website-and-content-management_1783940666003.txt`. Brand logos: `attached_assets/` (Legacy Pathways logo variants + brand board).

## Source harvest dataset

`data/source-harvest/` holds a **private staging dataset** harvested July 2026 from 28maoribattalion.org.nz and armymuseum.co.nz: 6,155 battalion roll records (`roll.json`), three content pages (`pages/`), 23 photos (`images/`), full provenance (`provenance.json`), and `HARVEST_REPORT.md`. **Do not publish any of it until written permission is confirmed.** See `scripts/src/harvest-roll.md` for constraints (Cloudflare protection, Wayback image mirroring) and re-run commands.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
