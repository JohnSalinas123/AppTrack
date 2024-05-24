import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import JobStatus, { IJobStatus } from "../models/JobStatus";

export const addJobStatus = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const { name } = req.body;

	try {
		// check if status already exists for user
		const existingStatus = await JobStatus.findOne({
			user: req.user.id,
			name: name,
		});
		if (existingStatus) {
			return res.status(400).json({ message: "Status already exists" });
		}

		// create status object
		const newJobStatus: IJobStatus = new JobStatus({
			user: req.user._id,
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
