import { Router, type IRouter } from "express";
import {
  db,
  contactEnquiriesTable,
  tourEnquiriesTable,
  schoolEnquiriesTable,
  storyContributionsTable,
} from "@workspace/db";
import {
  SubmitContactEnquiryBody,
  SubmitContactEnquiryResponse,
  SubmitTourEnquiryBody,
  SubmitTourEnquiryResponse,
  SubmitSchoolEnquiryBody,
  SubmitSchoolEnquiryResponse,
  SubmitStoryContributionBody,
  SubmitStoryContributionResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function isSpam(honeypot: string | undefined): boolean {
  return typeof honeypot === "string" && honeypot.trim().length > 0;
}

router.post("/enquiries/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { website, ...data } = parsed.data;
  if (isSpam(website)) {
    res.status(201).json(
      SubmitContactEnquiryResponse.parse({
        id: 0,
        message: "Thank you — your enquiry has been received.",
      }),
    );
    return;
  }
  const [row] = await db.insert(contactEnquiriesTable).values(data).returning();
  res.status(201).json(
    SubmitContactEnquiryResponse.parse({
      id: row.id,
      message: "Thank you — your enquiry has been received.",
    }),
  );
});

router.post("/enquiries/tour", async (req, res): Promise<void> => {
  const parsed = SubmitTourEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { website, ...data } = parsed.data;
  if (isSpam(website)) {
    res.status(201).json(
      SubmitTourEnquiryResponse.parse({
        id: 0,
        message: "Thank you — your interest has been registered.",
      }),
    );
    return;
  }
  const [row] = await db.insert(tourEnquiriesTable).values(data).returning();
  res.status(201).json(
    SubmitTourEnquiryResponse.parse({
      id: row.id,
      message:
        "Thank you — your interest has been registered. We will be in touch as tour details are confirmed.",
    }),
  );
});

router.post("/enquiries/school", async (req, res): Promise<void> => {
  const parsed = SubmitSchoolEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { website, ...data } = parsed.data;
  if (isSpam(website)) {
    res.status(201).json(
      SubmitSchoolEnquiryResponse.parse({
        id: 0,
        message: "Thank you — your enquiry has been received.",
      }),
    );
    return;
  }
  const [row] = await db.insert(schoolEnquiriesTable).values(data).returning();
  res.status(201).json(
    SubmitSchoolEnquiryResponse.parse({
      id: row.id,
      message:
        "Thank you — your enquiry has been received. Our education team will respond soon.",
    }),
  );
});

router.post("/enquiries/story", async (req, res): Promise<void> => {
  const parsed = SubmitStoryContributionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { website, ...data } = parsed.data;
  if (isSpam(website)) {
    res.status(201).json(
      SubmitStoryContributionResponse.parse({
        id: 0,
        message: "Thank you for sharing — your contribution has been received.",
      }),
    );
    return;
  }
  const [row] = await db
    .insert(storyContributionsTable)
    .values(data)
    .returning();
  res.status(201).json(
    SubmitStoryContributionResponse.parse({
      id: row.id,
      message:
        "Thank you for sharing — your contribution has been received. Nothing is published without review and whānau permission.",
    }),
  );
});

export default router;
