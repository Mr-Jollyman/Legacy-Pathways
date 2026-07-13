# Source Harvest — how it was produced and how to extend it

## What exists

`data/source-harvest/` contains a private staging dataset harvested on 13 July 2026:

- `roll.json` — 6,155 battalion roll records (surname, forenames, war, WW1/WW2 serial numbers, canonical profile URL, per-record source URL).
- `roll_raw.jsonl` — raw per-page harvest log the roll was built from.
- `pages/` — extracted text (markdown) of the 28maoribattalion.org.nz homepage, "Story of the 28th" narrative, and the Army Museum education page, each with provenance headers.
- `images/` — 23 photos/graphics referenced on those pages.
- `provenance.json` — source URL, date accessed, copyright status, and import method for every dataset and image.
- `HARVEST_REPORT.md` — summary, failure list, and the permissions checklist.

## Usage policy

**Private staging only.** Nothing in `data/source-harvest/` may be published or displayed publicly until Legacy Pathways confirms written permission from Manatū Taonga (28maoribattalion.org.nz) and the National Army Museum. Per the project brief, any future automated per-profile import must be gated behind `AUTHORISED_ROLL_IMPORT=true` (default false).

## Technical constraints discovered

- **28maoribattalion.org.nz is Cloudflare-protected**: plain `fetch`/`curl` gets a 403 challenge page for every path, including images. The harvest used a rendering fetch service for HTML, and mirrored image files from the Internet Archive (`https://web.archive.org/web/2024id_/<original-url>`), which serves the same files without protection.
- **armymuseum.co.nz is fully open** (robots.txt allows all; direct fetch works).
- Roll pagination: `https://28maoribattalion.org.nz/roll?page=N`, 40 rows/page, pages 0–153; page 154 returns "No results found". Letter browsing also exists at `/roll/A` … `/roll/Z`.
- Rendered fetches occasionally return empty content transiently — always retry 3–4 times before treating a page as empty, and only treat a page as end-of-data if it renders full page chrome ("No results found").
- Individual profile pages live at `https://28maoribattalion.org.nz/soldier/<slug>`; every roll record in `roll.json` carries its `profileUrl`, so a per-profile harvester can resume directly from `roll.json` once permission is confirmed.

## Commands

```bash
pnpm --filter @workspace/scripts exec tsx src/harvest-roll.ts validate   # sanity-check roll.json
pnpm --filter @workspace/scripts exec tsx src/harvest-roll.ts rebuild    # rebuild roll.json from roll_raw.jsonl
```
