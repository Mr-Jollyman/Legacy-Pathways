import { Router, type IRouter } from "express";
import { asc } from "drizzle-orm";
import { db, toursTable } from "@workspace/db";
import { ListToursResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/tours", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(toursTable)
    .orderBy(asc(toursTable.sortOrder), asc(toursTable.name));
  res.json(ListToursResponse.parse(rows));
});

export default router;
