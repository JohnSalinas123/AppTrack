import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import JobApplication, { IJobApplication } from "../models/JobApplication";
import User, { IUser } from "../models/User";
import JobStatus, { IJobStatus } from "../models/JobStatus";

// POST
// add a job application
export const addJobApplication = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { jobTitle, companyName, applicationDate, jobDescription, statusIds } =
		req.body;

	try {
		console.log(req.body);

		const user = (req as AuthenticatedRequest).user;

		console.log(user);

		// fetch JobStatus documents
		const jobStatuses = await JobStatus.find({
			_id: { $in: statusIds },
			user: user._id,
		});

		console.log(jobStatuses);

		// validate statusIds

		// create new jobStatuses array for JobApplication
		const jobStatusesRefs = jobStatuses.map((jobStatus) => jobStatus._id);

		const newJobAplication: IJobApplication = new JobApplication({
			user: user._id,
			jobTitle,
			companyName,
			applicationDate,
			jobDescription,
			statuses: jobStatusesRefs,
		});

		await newJobAplication.save();

		return res.status(201).json(newJobAplication);
	} catch (error: unknown) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};

// GET
// fetch all job applications for user
export const getJobApplications = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const user = (req as AuthenticatedRequest).user;
		const page = parseInt(req.query.page as string) || 1;
		const limit = 10; // plan: make a user setting

		const skip = (page - 1) * limit;

		const jobApplications = await JobApplication.find({ user: user._id })
			.populate("statuses")
			.skip(skip)
			.limit(limit)
			.exec();

		const totalCount = await JobApplication.countDocuments({ user: user._id });

		const totalPages = Math.ceil(totalCount / limit);

		return res.status(200).json({
			totalCount,
			totalPages,
			currentPage: page,
			jobApplications,
		});
	} catch (error: unknown) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};
