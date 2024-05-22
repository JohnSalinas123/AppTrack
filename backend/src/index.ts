import express, { Application, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Job Application Tracker API");
});

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/job-tracker", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("Could not connect to MongoDB", error));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
