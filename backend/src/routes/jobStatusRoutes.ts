import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
	addJobStatus,
	getJobStatuses,
} from "../controllers/jobStatusController";

const router: Router = Router();

router.post("/", authMiddleware, addJobStatus);
router.get("/", authMiddleware, getJobStatuses);

export default router;
