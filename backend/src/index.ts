import dotenv from "dotenv";
dotenv.config();


import express, { Application, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import userRoutes from './routes/userRoutes';
import connectToDB from "./connectToDB";



const app: Application = express();
connectToDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Job Application Tracker API");
});



app.use("/api/users", userRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
