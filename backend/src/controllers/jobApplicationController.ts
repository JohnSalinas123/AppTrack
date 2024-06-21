import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import JobApplication, { IJobApplication } from "../models/JobApplication";
import JobStatus, { IJobStatus } from "../models/JobStatus";
import mongoose from "mongoose";

// POST
// add a job application
export const addJobApplication = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { title, company, appliedDate, notes, statusIds } = req.body;

	try {
		console.log(req.body);

		const user = (req as AuthenticatedRequest).user;

		const newJobAplication: IJobApplication = new JobApplication({
			user: user._id,
			title,
			company,
			appliedDate,
			notes,
			statusIds: statusIds,
		});

		await newJobAplication.save();

		const populatedNewJobApplication = await newJobAplication.populate(
			"statusIds"
		);

		return res.status(201).json(populatedNewJobApplication);
	} catch (error: unknown) {
		const typedError = error as Error;
		console.log("Failed to add application error: ", typedError);
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
			.populate({
				path: "statusIds",
				select: "-user -__v",
			})
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

// POST
// add job status to job application
export const addJobStatusToJobApp = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { jobStatusID, jobApplicationID } = req.body;

	try {
		const userObj = (req as AuthenticatedRequest).user;

		// fetch existing job status
		const jobStatus = await JobStatus.findOne({
			user: userObj._id,
			_id: jobStatusID,
		}).lean();

		// fetch existing job application
		const jobApplication = await JobApplication.findOne({
			user: userObj._id,
			_id: jobApplicationID,
		});

		// validate job status and job applications
		if (!jobStatus) {
			console.log("Job status not found");
			return res
				.status(404)
				.json({ message: "Failed to add job status to application" });
		}

		if (!jobApplication) {
			console.log("Job application not found");
			return res
				.status(404)
				.json({ message: "Failed to add job status to application" });
		}

		//add new job status to job application
		jobApplication?.statusIds.push(jobStatusID);
		jobApplication.save();

		console.log(jobStatus);
		// respond with added job status
		const { user, __v, ...newJobStatusAdded } = jobStatus;
		console.log(newJobStatusAdded);
		return res.status(201).json(newJobStatusAdded);
	} catch (error: unknown) {
		const typedError = error as Error;
		console.log("Error adding job status to job app:", typedError);
		return res
			.status(500)
			.json({ message: "Failed to add job status to job application." });
	}
};

// POST
// delete a user job application
// TODO: deleteJobApplication: Promise<Response> => {message: "Job application successfully deleted."}

// POST
// update a user job application
// TODO: updateJobApplication: Promise<Response> => {message: "Job application successfully updated"}
