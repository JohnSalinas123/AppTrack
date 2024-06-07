import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthenticatedRequest } from "../types/express";
import JobStatus, { IJobStatus } from "../models/JobStatus";
import JobApplication from "../models/JobApplication";

// constant for secure cookies parameter (for testing)
const SECURE_COOKIE_BOOL = true;

// default job statuses for new users
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

	// check if acceptable email and password included in req
	if (!email || !password || email.length == 0 || password.length == 0) {
		res.status(422).json({ message: "Missing or empty required parameters" });
	}

	try {
		// check if the user already exists (check if email is unique)
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Sign up failed" });
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
			return jobStatus.save();
		});

		await Promise.all(jobStatusPromises);

		// Create access token
		const accessToken = jwt.sign(
			{ id: newUser._id, email: newUser.email },
			process.env.ACCESS_TOKEN_SECRET as string,
			{
				expiresIn: "10m",
			}
		);

		// Create refresh token
		const refreshToken = jwt.sign(
			{ id: newUser._id, email: newUser.email },
			process.env.REFRESH_TOKEN_SECRET as string,
			{
				expiresIn: "1d",
			}
		);

		// Store access token in HTTP-only cookie
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			sameSite: "none",
			secure: SECURE_COOKIE_BOOL,
			maxAge: 10 * 60 * 1000,
		});

		// Store refresh token in HTTP-only cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "none",
			secure: SECURE_COOKIE_BOOL,
			maxAge: 24 * 60 * 60 * 1000,
		});

		// log: user registered
		console.log(`User ${newUser._id} successfully registered`);

		return res.status(201).json({ message: "User successfully registered" });
	} catch (error: unknown) {
		const typedError = error as Error;
		console.log("Register error:", typedError);
		return res.status(500).json({ error: "An unexpected error has occured" });
	}
};

// POST
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

		// Create access token
		const accessToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.ACCESS_TOKEN_SECRET as string,
			{
				expiresIn: "10m",
			}
		);

		// Create refresh token
		const refreshToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.REFRESH_TOKEN_SECRET as string,
			{
				expiresIn: "1d",
			}
		);

		// Store access token in HTTP-only cookie
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			sameSite: "none",
			secure: SECURE_COOKIE_BOOL,
			maxAge: 10 * 60 * 1000,
		});

		// Store refresh token in HTTP-only cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "none",
			secure: SECURE_COOKIE_BOOL,
			maxAge: 24 * 60 * 60 * 1000,
		});

		// log: user logged in
		console.log(`User ${user._id} successfully logged in`);

		return res.status(200).json({ message: "Login successful" });
	} catch (error: unknown) {
		const typedError = error as Error;
		console.log("Login error:", typedError);
		return res.status(500).json({ error: "An unexpected error has occured" });
	}
};

// POST
// logout user
export const logout = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const user = (req as AuthenticatedRequest).user;

		const userLoggingOutID = user._id;

		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		res.clearCookie("refreshToken", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		// log: user logged out
		console.log(`User ${userLoggingOutID} successfully logged in`);

		return res.status(200).json({ message: "Logout successful" });
	} catch (error: unknown) {
		const typedError = error as Error;
		console.log("Logout error:", typedError);
		return res.status(500).json({ error: "An unexpected error has occured" });
	}
};

// POST
// refresh
export const refreshToken = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	const { refreshToken } = req.cookies;

	if (!refreshToken) {
		return res.status(401).json({ message: "Unathorized" });
	}

	try {
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET as string,
			(error: any, user: any) => {
				if (error) {
					return res.status(403).json({ message: "Forbidden" });
				}

				// Generate new accessToken
				const newAccessToken = jwt.sign(
					{ id: (user as any).id, email: (user as any).email },
					process.env.ACCESS_TOKEN_SECRET as string,
					{ expiresIn: "10m" }
				);

				// Store new access token in HTTP-only cookie
				res.cookie("accessToken", newAccessToken, {
					httpOnly: true,
					sameSite: "none",
					secure: SECURE_COOKIE_BOOL,
					maxAge: 10 * 60 * 1000,
				});

				// log: refresh token usage
				console.log(`Refresh token used by user ${user._id}`);

				return res.status(200).json({ message: "Access token refreshed" });
			}
		);
	} catch (error: unknown) {
		const typedError = error as Error;
		console.log("Token refresh error:", error);
		return res.status(500).json({ error: "An unexpected error has occured" });
	}
};

// POST
// check if user is authorized
export const chechUserAuth = (req: Request, res: Response): Response => {
	const user = (req as AuthenticatedRequest).user;

	// log: auth check passsed by user
	console.log(`Auth checked for user ${user._id}`);

	return res.status(200).json({ message: "Authenticated" });
};

// GET
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

		// log: fetched user data
		console.log(`Data fetched for user ${user._id}`);

		return res.json(userWithoutPassword);
	} catch (error) {
		const typedEror = error as Error;
		return res.status(500).json({ error: typedEror.message });
	}
};

// POST
// delete a user and all associated data
export const deleteUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const user = (req as AuthenticatedRequest).user;

		// remove user job applications
		await JobApplication.deleteMany({ user: user._id });

		// remove user jobStatuses
		await JobStatus.deleteMany({ user: user._id });

		// remove user
		await User.deleteOne({ _id: user._id });

		// log: delete user account and data
		console.log(`Deleted user ${user._id}`);

		return res.json({ message: "User account and data successfully deleted." });
	} catch (error) {
		const typedError = error as Error;
		return res.status(500).json({ error: typedError.message });
	}
};

// POST
// update user information or settings(planned)
// TODO: updateUserSettings

// POST
// update user password. must figure out method for secure password change
// TODO: updateUserPassword

// POST
// delete user data but not account
// TODO: deleteUserData: Promise<Response> => {message: "User data successfully deleted"}
