import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthenticatedRequest } from "../types/express";
import JobStatus, { IJobStatus } from "../models/JobStatus";

const defaultJobStatuses = [
	{ name: "Applied" },
	{ name: "Phone Screen" },
	{ name: "Technical" },
	{ name: "Bahavioral" },
	{ name: "System Design" },
	{ name: "Panel" },
	{ name: "On-site" },
	{ name: "Offer" },
	{ name: "Rejected" },
];

// POST
// register new user
export const register = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { email, password } = req.body;
	try {
		// check if the user already exists (check if email uniqueness)
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser: IUser = new User({ email, password: hashedPassword });
		await newUser.save();

		// create default jobStatuses for new user
		const jobStatusPromises = defaultJobStatuses.map((status) => {
			const jobStatus: IJobStatus = new JobStatus({
				user: newUser._id,
				name: status.name,
			});
			return jobStatus;
		});

		await Promise.all(jobStatusPromises);

		const token = jwt.sign(
			{ id: newUser._id },
			process.env.JWT_SECRET as string,
			{ expiresIn: "1h" }
		);
		return res.status(201).json({ token });
	} catch (error: unknown) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};

// login user
export const login = async (req: Request, res: Response): Promise<Response> => {
	const { email, password } = req.body;
	try {
		const user: IUser | null = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
			expiresIn: "1h",
		});
		return res.json({ token });
	} catch (error: unknown) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};

// get user data
export const getUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const user = (req as AuthenticatedRequest).user;

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const { password, __v, ...userWithoutPassword } = user.toObject();
		console.log(userWithoutPassword); // print out user data for testing

		return res.json(userWithoutPassword);
	} catch (error) {
		const typedEror = error as Error;
		return res.status(500).json({ error: typedEror.message });
	}
};
