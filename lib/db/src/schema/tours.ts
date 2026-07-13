import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const toursTable = pgTable("tours", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("proposed"),
  summary: text("summary").notNull(),
  historicalOverview: text("historical_overview"),
  destinations: jsonb("destinations").$type<string[]>().notNull().default([]),
  durationDays: integer("duration_days"),
  estimatedPrice: text("estimated_price"),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  sampleData: boolean("sample_data").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Tour = typeof toursTable.$inferSelect;
