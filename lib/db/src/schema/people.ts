import {
  pgTable,
  serial,
  text,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const peopleTable = pgTable("people", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  fullName: text("full_name").notNull(),
  surname: text("surname").notNull(),
  givenName: text("given_name").notNull(),
  alternativeNames: jsonb("alternative_names")
    .$type<string[]>()
    .notNull()
    .default([]),
  rank: text("rank"),
  serviceNumber: text("service_number"),
  war: text("war"),
  unit: text("unit"),
  company: text("company"),
  iwi: text("iwi"),
  hapu: text("hapu"),
  teArawa: boolean("te_arawa").notNull().default(false),
  birthplace: text("birthplace"),
  ohinemutuConnection: boolean("ohinemutu_connection").notNull().default(false),
  buriedAtMuruika: boolean("buried_at_muruika").notNull().default(false),
  graveReference: text("grave_reference"),
  dateOfBirth: text("date_of_birth"),
  dateOfDeath: text("date_of_death"),
  enlistmentDetails: text("enlistment_details"),
  campaigns: jsonb("campaigns").$type<string[]>().notNull().default([]),
  honours: jsonb("honours").$type<string[]>().notNull().default([]),
  shortBio: text("short_bio"),
  fullStory: text("full_story"),
  timeline: jsonb("timeline")
    .$type<{ year: string; label: string }[]>()
    .notNull()
    .default([]),
  portraitUrl: text("portrait_url"),
  galleryUrls: jsonb("gallery_urls").$type<string[]>().notNull().default([]),
  sources: jsonb("sources")
    .$type<
      { name: string; url?: string | null; organisation?: string | null }[]
    >()
    .notNull()
    .default([]),
  verificationStatus: text("verification_status")
    .notNull()
    .default("placeholder"),
  featured: boolean("featured").notNull().default(false),
  lastReviewed: text("last_reviewed"),
  sampleData: boolean("sample_data").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Person = typeof peopleTable.$inferSelect;
