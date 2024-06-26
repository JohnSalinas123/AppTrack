import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
	addJobApplication,
	addJobStatusToJobApp,
	deleteJobApplication,
	getJobApplications,
} from "../controllers/jobApplicationController";

const router: Router = Router();

router.post("/", authMiddleware, addJobApplication);
router.get("/", authMiddleware, getJobApplications);
router.post("/add-status", authMiddleware, addJobStatusToJobApp);
router.delete("/:id", authMiddleware, deleteJobApplication);

export default router;
