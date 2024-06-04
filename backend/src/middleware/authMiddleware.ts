import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthenticatedRequest } from "../types/express";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.accessToken;
	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}

	try {
		// verify token
		const decoded = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET as string
		) as { id: string };
		console.log(decoded);

		// find the user by id
		const user: IUser | null = await User.findById(decoded.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		(req as AuthenticatedRequest).user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token is not valid" });
	}
};
