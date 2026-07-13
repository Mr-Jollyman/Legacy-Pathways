---
name: Harvesting 28maoribattalion.org.nz
description: How to fetch data/images from the Cloudflare-protected battalion site and open armymuseum.co.nz
---

- 28maoribattalion.org.nz returns a Cloudflare 403 challenge to every plain fetch/curl request, including image files. HTML must be fetched with the rendering `webFetch` callback; image files can be mirrored from the Internet Archive at `https://web.archive.org/web/2024id_/<original-url>` (same bytes, no protection).
- **Why:** direct scraping fails silently with challenge-page HTML; wasted attempts otherwise.
- **How to apply:** any future per-profile harvest (~6,155 pages at `/soldier/<slug>`) should use webFetch with 3-4 retries — rendered fetches transiently return empty markdown, so only treat a page as end-of-data when it renders full chrome ("No results found"). Roll pagination is `?page=0..153`, 40 rows/page.
- armymuseum.co.nz is fully open (robots.txt allows all; direct curl works).
- Harvested material is permission-pending staging only (`data/source-harvest/`); the Legacy Pathways brief requires `AUTHORISED_ROLL_IMPORT=true` gating for any automated import into the future site, and no publication before written permission.
- Long webFetch loops in the code_execution notebook: persist progress to disk every page — the notebook can time out (600s) and restart, losing all in-memory state.
