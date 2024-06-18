import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
	addJobApplication,
	addJobStatusToJobApp,
	getJobApplications,
} from "../controllers/jobApplicationController";

const router: Router = Router();

router.post("/", authMiddleware, addJobApplication);
router.get("/", authMiddleware, getJobApplications);
router.post("/add-status", authMiddleware, addJobStatusToJobApp);

export default router;
