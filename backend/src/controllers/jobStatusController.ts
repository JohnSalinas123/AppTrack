import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import JobStatus, { IJobStatus } from "../models/JobStatus";

// POST
// add a single job status with a reference to current user
export const addJobStatus = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { name } = req.body;

	try {
		const user = (req as AuthenticatedRequest).user;

		// check if status already exists for user
		const existingStatus = await JobStatus.findOne({
			user: user._id,
			name: name,
		});
		if (existingStatus) {
			return res.status(400).json({ message: "Status already exists" });
		}

		// create status object
		const newJobStatus: IJobStatus = new JobStatus({
			user: user._id,
			name,
		});

		// save new status of user to database
		await newJobStatus.save();
		return res.status(201).json(newJobStatus);
	} catch (error: unknown) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};

// GET
// get a user's job statuses
export const getJobStatuses = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const userObj = (req as AuthenticatedRequest).user;

		// get all jobstatus documents from jobstatus collection that ref current user
		const jobStatuses = await JobStatus.find({ user: userObj._id });
		if (!jobStatuses) {
			return res.status(400).json({ message: "No statuses found" });
		}

		const jobStatusesWithoutUser = jobStatuses.map(({ _id, name }) => ({
			_id,
			name,
		}));

		return res.status(201).json(jobStatusesWithoutUser);
	} catch (error: unknown) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};

// POST
// delete a user job status
// TODO: deleteJobStatus: Promise<Response> => {message: "Job status successfully deleted."}

// POST
// update job status name
// TODO: updateJobStatus: Promise<Response> => {message: "Job status successfully updated."}
