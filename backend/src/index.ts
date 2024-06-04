import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import jobStatusRoutes from "./routes/jobStatusRoutes";
import jobApplicationRoutes from "./routes/jobApplicationRoutes";
import connectToDB from "./connectToDB";
import cookierparser from "cookie-parser";
import cors from "cors";

const app: Application = express();
connectToDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookierparser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.get("/", (req: Request, res: Response) => {
	res.send("Job Application Tracker API");
});

app.use("/api/users", userRoutes);
app.use("/api/job-statuses", jobStatusRoutes);
app.use("/api/job-application", jobApplicationRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
