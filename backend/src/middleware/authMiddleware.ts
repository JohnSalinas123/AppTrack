import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthenticatedRequest } from "../types/express";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.cookies.accessToken;
	const refreshToken = req.cookies.refreshToken;

	if (!accessToken && !refreshToken) {
		return res.status(401).json({ message: "Authorization denied" });
	}

	// if access token is present verify it
	if (accessToken) {
		try {
			// verify access token
			const decoded = jwt.verify(
				accessToken,
				process.env.ACCESS_TOKEN_SECRET as string
			) as { id: string };

			// find the user by id
			const user: IUser | null = await User.findById(decoded.id);
			if (!user) {
				console.log("Auth middleware failed, user not found");
				return res.status(401).json({ message: "Authorization denied" });
			}

			(req as AuthenticatedRequest).user = user;
			return next();
		} catch (error) {
			return res.status(401).json({ message: "Authorization denied" });
		}
	}

	// if access token not present, use refresh token
	if (refreshToken) {
		try {
			// verify refresh token
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET as string
			) as { id: string; email: string };

			// generate new access token
			const newAccessToken = jwt.sign(
				{ id: decoded.id, email: decoded.email },
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: "10m" }
			);

			res.cookie("accessToken", newAccessToken, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: 10 * 60 * 1000,
			});

			// find the user by id
			const user: IUser | null = await User.findById(decoded.id);
			if (!user) {
				console.log("Auth middleware failed, user not found");
				return res.status(401).json({ message: "Authorization denied" });
			}

			(req as AuthenticatedRequest).user = user;
			// log: refresh token usage
			console.log(`Refresh token used by user ${user._id}`);
			return next();
		} catch (error: unknown) {
			const typedError = error as Error;
			console.log("Token refresh error:", typedError);
			return res.status(500).json({ error: "An unexpected error has occured" });
		}
	}
};
