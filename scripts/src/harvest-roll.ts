/**
 * Source-harvest tooling for Legacy Pathways.
 *
 * Rebuilds and validates `data/source-harvest/roll.json` from the raw
 * harvest log (`roll_raw.jsonl`), and can extend the image mirror.
 *
 * IMPORTANT — usage policy:
 * - All harvested material is PRIVATE STAGING ONLY. Nothing may be
 *   published until Legacy Pathways confirms written permission from the
 *   source organisations. See data/source-harvest/HARVEST_REPORT.md.
 * - Any future per-profile harvesting of 28maoribattalion.org.nz must be
 *   explicitly enabled with AUTHORISED_ROLL_IMPORT=true (default: off),
 *   per the Legacy Pathways brief.
 *
 * Technical notes (as of the July 2026 harvest):
 * - 28maoribattalion.org.nz sits behind Cloudflare bot protection, so plain
 *   HTTP clients (fetch/curl) receive a 403 challenge page. The original
 *   harvest used a rendering fetch service. Image files were mirrored from
 *   Internet Archive copies of the same URLs
 *   (https://web.archive.org/web/2024id_/<original-url>), which are not
 *   Cloudflare-protected.
 * - armymuseum.co.nz allows direct fetching (robots.txt: allow all).
 * - Roll listing: https://28maoribattalion.org.nz/roll?page=N, 40 rows per
 *   page, pages 0..153, ends with a "No results found" page.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const HARVEST_DIR = path.join(REPO_ROOT, "data", "source-harvest");
const RAW = path.join(HARVEST_DIR, "roll_raw.jsonl");
const OUT = path.join(HARVEST_DIR, "roll.json");

interface RawRow {
  page: number;
  surname: string;
  slug: string;
  forename: string;
  war: string;
  ww1Serial: string | null;
  ww2Serial: string | null;
}

function rebuildRoll(): void {
  if (!fs.existsSync(RAW)) {
    console.error(`Missing ${RAW} — nothing to rebuild.`);
    process.exit(1);
  }
  const rows: RawRow[] = fs
    .readFileSync(RAW, "utf8")
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));

  const bySlug = new Map<string, object>();
  for (const r of rows) {
    if (!bySlug.has(r.slug)) {
      bySlug.set(r.slug, {
        surname: r.surname,
        forename: r.forename,
        war: r.war,
        ww1SerialNo: r.ww1Serial,
        ww2SerialNo: r.ww2Serial,
        slug: r.slug,
        profileUrl: `https://28maoribattalion.org.nz/soldier/${r.slug}`,
        sourceUrl: `https://28maoribattalion.org.nz/roll?page=${r.page}`,
      });
    }
  }
  const records = [...bySlug.values()].sort((a: any, b: any) =>
    a.surname.localeCompare(b.surname) || a.forename.localeCompare(b.forename),
  );
  fs.writeFileSync(
    OUT,
    JSON.stringify(
      {
        source: "https://28maoribattalion.org.nz/roll",
        dateAccessed: new Date().toISOString(),
        totalRecords: records.length,
        copyrightStatus: "permission pending — 28maoribattalion.org.nz",
        importMethod: "automated harvest",
        records,
      },
      null,
      2,
    ),
  );
  console.log(`Rebuilt ${OUT}: ${records.length} unique records from ${rows.length} raw rows.`);
}

function validate(): void {
  const data = JSON.parse(fs.readFileSync(OUT, "utf8"));
  const slugs = new Set<string>();
  let dupes = 0;
  for (const r of data.records) {
    if (slugs.has(r.slug)) dupes++;
    slugs.add(r.slug);
  }
  const wars: Record<string, number> = {};
  for (const r of data.records) wars[r.war] = (wars[r.war] ?? 0) + 1;
  console.log(`roll.json: ${data.records.length} records, ${dupes} duplicate slugs`);
  console.log("by war:", wars);
}

const cmd = process.argv[2] ?? "validate";
if (cmd === "rebuild") rebuildRoll();
else if (cmd === "validate") validate();
else {
  console.error("Usage: tsx scripts/src/harvest-roll.ts [rebuild|validate]");
  process.exit(1);
}
