import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
	addJobApplication,
	getJobApplications,
} from "../controllers/jobApplicationController";

const router: Router = Router();

router.post("/", authMiddleware, addJobApplication);
router.get("/", authMiddleware, getJobApplications);

export default router;
