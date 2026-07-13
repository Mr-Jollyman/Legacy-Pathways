# Source Harvest Report

  Generated: 2026-07-13T11:43:12.253Z

  ## What was collected

  | Dataset | Contents | Count |
  |---|---|---|
  | `roll.json` | Battalion roll entries (surname, forenames, war, WW1/WW2 serial numbers, profile URL) | 6,155 records |
  | `pages/homepage.json` | 28maoribattalion.org.nz homepage text | 1 page |
  | `pages/story-of-the-28th.json` | "Story of the 28th" history narrative | 1 page |
  | `pages/armymuseum-education.json` | Army Museum 28th Māori Battalion education programme page | 1 page |
  | `images/` | Photos and graphics referenced on the harvested pages | 23 files |

  Roll breakdown by war: WW1 2,709 · WW2 3,437 · WW1 & WW2 7 · unspecified 2.

  ## How it was collected

  - Roll listing pages 0–153 fetched with rendered page fetches, rate-limited, with retry on transient failures. Page 154 confirmed "No results found" (end of roll).
  - 28maoribattalion.org.nz blocks direct (non-browser) requests via Cloudflare, so image files from that site were retrieved from Internet Archive (web.archive.org) mirrors of the exact same URLs. Original URLs are recorded in `provenance.json`.
  - armymuseum.co.nz pages and images were fetched directly (robots.txt allows all crawling).

  ## Failures

  None — all targeted pages and images were collected.

  ## Not collected (out of scope)

  - Individual soldier profile pages (~6,155 pages) — deferred until reuse permission and scope are confirmed. Each roll record already carries its canonical profile URL, so a per-profile harvester can resume from `roll.json`.
  - Oral-history audio/video files.

  ## Usage restrictions — IMPORTANT

  This dataset is **private staging material only**. Per the Legacy Pathways brief, nothing here may be published, republished, or displayed publicly until:

  1. Written permission from Manatū Taonga / 28maoribattalion.org.nz covering the roll data, page text, and photographs, with confirmed scope of reuse.
  2. Permission from the National Army Museum Te Mata Toa for its page content and images.
  3. Confirmation of copyright status for individual archival photographs (some images on the source sites are credited to third parties such as Alexander Turnbull Library — check per-image credits before any reuse).
  4. Administrator approval of each record through the future import/moderation workflow.

  Every record and file carries provenance fields (source URL, date accessed, copyright status, import method) in `provenance.json`.

  ## Re-running / extending the harvest

  See `scripts/src/harvest-roll.md` for how this harvest was produced and how to extend it to per-profile harvesting once permission is confirmed.
  