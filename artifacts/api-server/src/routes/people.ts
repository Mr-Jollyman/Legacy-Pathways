import { Router, type IRouter } from "express";
import { and, asc, count, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { db, peopleTable } from "@workspace/db";
import {
  ListPeopleQueryParams,
  ListPeopleResponse,
  GetFeaturedPeopleResponse,
  GetPeopleStatsResponse,
  GetPersonParams,
  GetPersonResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function boolParam(value: unknown): boolean | undefined {
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;
  if (value === undefined || value === "") return undefined;
  throw new InvalidBooleanParamError();
}

class InvalidBooleanParamError extends Error {
  constructor() {
    super("Boolean query parameters must be 'true' or 'false'");
  }
}

function toSummary(p: typeof peopleTable.$inferSelect) {
  return {
    slug: p.slug,
    fullName: p.fullName,
    rank: p.rank,
    serviceNumber: p.serviceNumber,
    war: p.war,
    unit: p.unit,
    portraitUrl: p.portraitUrl,
    shortBio: p.shortBio,
    buriedAtMuruika: p.buriedAtMuruika,
    teArawa: p.teArawa,
    verificationStatus: p.verificationStatus,
    sampleData: p.sampleData,
  };
}

router.get("/people", async (req, res): Promise<void> => {
  const parsed = ListPeopleQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const q = parsed.data;
  const page = q.page ?? 1;
  const pageSize = q.pageSize ?? 24;

  const conditions: SQL[] = [];
  if (q.search) {
    const term = `%${q.search}%`;
    const cond = or(
      ilike(peopleTable.fullName, term),
      ilike(peopleTable.serviceNumber, term),
      sql`${peopleTable.alternativeNames}::text ILIKE ${term}`,
    );
    if (cond) conditions.push(cond);
  }
  if (q.letter) {
    conditions.push(ilike(peopleTable.surname, `${q.letter}%`));
  }
  if (q.war) {
    conditions.push(eq(peopleTable.war, q.war));
  }
  if (q.unit) {
    conditions.push(ilike(peopleTable.unit, `%${q.unit}%`));
  }
  let teArawa: boolean | undefined;
  let ohinemutu: boolean | undefined;
  let buriedAtMuruika: boolean | undefined;
  try {
    teArawa = boolParam(req.query.teArawa);
    ohinemutu = boolParam(req.query.ohinemutu);
    buriedAtMuruika = boolParam(req.query.buriedAtMuruika);
  } catch {
    res.status(400).json({
      error: "Boolean query parameters must be 'true' or 'false'",
    });
    return;
  }
  if (teArawa !== undefined) {
    conditions.push(eq(peopleTable.teArawa, teArawa));
  }
  if (ohinemutu !== undefined) {
    conditions.push(eq(peopleTable.ohinemutuConnection, ohinemutu));
  }
  if (buriedAtMuruika !== undefined) {
    conditions.push(eq(peopleTable.buriedAtMuruika, buriedAtMuruika));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const orderBy =
    q.sort === "givenName"
      ? [asc(peopleTable.givenName), asc(peopleTable.surname)]
      : q.sort === "serviceNumber"
        ? [asc(peopleTable.serviceNumber)]
        : [asc(peopleTable.surname), asc(peopleTable.givenName)];

  const [items, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(peopleTable)
      .where(where)
      .orderBy(...orderBy)
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ value: count() }).from(peopleTable).where(where),
  ]);

  res.json(
    ListPeopleResponse.parse({
      items: items.map(toSummary),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    }),
  );
});

router.get("/people/featured", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(peopleTable)
    .where(eq(peopleTable.featured, true))
    .orderBy(asc(peopleTable.surname))
    .limit(6);
  res.json(GetFeaturedPeopleResponse.parse(rows.map(toSummary)));
});

router.get("/people/stats", async (_req, res): Promise<void> => {
  const [totals] = await db
    .select({
      total: count(),
      buriedAtMuruika: sql<number>`count(*) filter (where ${peopleTable.buriedAtMuruika})`,
      teArawa: sql<number>`count(*) filter (where ${peopleTable.teArawa})`,
      verified: sql<number>`count(*) filter (where ${peopleTable.verificationStatus} = 'verified')`,
    })
    .from(peopleTable);

  const byWar = await db
    .select({ war: peopleTable.war, count: count() })
    .from(peopleTable)
    .groupBy(peopleTable.war)
    .orderBy(asc(peopleTable.war));

  res.json(
    GetPeopleStatsResponse.parse({
      total: totals.total,
      byWar: byWar
        .filter((r) => r.war !== null)
        .map((r) => ({ war: r.war as string, count: r.count })),
      buriedAtMuruika: Number(totals.buriedAtMuruika),
      teArawa: Number(totals.teArawa),
      verified: Number(totals.verified),
    }),
  );
});

router.get("/people/:slug", async (req, res): Promise<void> => {
  const params = GetPersonParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [person] = await db
    .select()
    .from(peopleTable)
    .where(eq(peopleTable.slug, params.data.slug));

  if (!person) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(GetPersonResponse.parse(person));
});

export default router;
