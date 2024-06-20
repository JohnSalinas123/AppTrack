import { JobAppTable } from "../components/apptable/JobAppTable";
import { JobStatsDisplay } from "../components/JobStatsDisplay";
import { JobStat } from "../types/jobStats";
import { JobApplication } from "../types/jobApplications";
import { useEffect, useState } from "react";
import axios from "axios";

const testingJobStats: JobStat[] = [
	{
		jobStatName: "Applied",
		jobStatCount: 5,
	},
	{
		jobStatName: "Interviews",
		jobStatCount: 1,
	},
	{
		jobStatName: "Pending",
		jobStatCount: 2,
	},
	{
		jobStatName: "Offers",
		jobStatCount: 1,
	},
	{
		jobStatName: "Rejected",
		jobStatCount: 1,
	},
];

export const ApplicationPage = () => {
	const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

	useEffect(() => {
		fetchJobApplications(); // fetch jobAplications
	}, []);

	const fetchJobApplications = async () => {
		try {
			const response = await axios.get("/api/job-application?page=1");
			console.log(response.data.jobApplications);
			setJobApplications(response.data.jobApplications);
		} catch (error) {
			console.log(error); // REMOVE
			console.log("Failed to fetch job applications");
		}
	};

	return (
		<>
			<JobStatsDisplay jobStats={testingJobStats} />
			<JobAppTable
				jobApplications={jobApplications}
				setJobApplications={setJobApplications}
			/>
		</>
	);
};
