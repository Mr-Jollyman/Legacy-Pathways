import { Router, type IRouter } from "express";
import healthRouter from "./health";
import peopleRouter from "./people";
import toursRouter from "./tours";
import enquiriesRouter from "./enquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(peopleRouter);
router.use(toursRouter);
router.use(enquiriesRouter);

export default router;
