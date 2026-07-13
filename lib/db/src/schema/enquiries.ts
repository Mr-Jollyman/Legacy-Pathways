import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const contactEnquiriesTable = pgTable("contact_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tourEnquiriesTable = pgTable("tour_enquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredTour: text("preferred_tour").notNull(),
  travellers: integer("travellers").notNull(),
  ageRange: text("age_range"),
  connectionToServiceman: text("connection_to_serviceman"),
  accessibilityNeeds: text("accessibility_needs"),
  roomArrangement: text("room_arrangement"),
  questions: text("questions"),
  receiveUpdates: boolean("receive_updates").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const schoolEnquiriesTable = pgTable("school_enquiries", {
  id: serial("id").primaryKey(),
  schoolName: text("school_name").notNull(),
  location: text("location").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  programme: text("programme").notNull(),
  preferredDates: text("preferred_dates"),
  studentCount: integer("student_count"),
  studentAges: text("student_ages"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const storyContributionsTable = pgTable("story_contributions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  relationship: text("relationship"),
  aboutPerson: text("about_person"),
  story: text("story").notNull(),
  supportingDetails: text("supporting_details"),
  publicUseConsent: boolean("public_use_consent").notNull().default(false),
  preferredCredit: text("preferred_credit"),
  keepPrivate: boolean("keep_private").notNull().default(false),
  moderationStatus: text("moderation_status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
