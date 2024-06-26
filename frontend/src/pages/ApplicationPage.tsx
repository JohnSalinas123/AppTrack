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
	const [totalPages, setTotalPages] = useState<number>(1);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		const fetchJobApplications = async () => {
			try {
				const response = await axios.get(`/api/job-application?page=${page}`);
				console.log(response.data);
				const jobApps = response.data.jobApplications;
				const totalPages = response.data.totalPages;
				setJobApplications(jobApps);
				setTotalPages(totalPages);
			} catch (error) {
				console.log(error); // REMOVE
				console.log("Failed to fetch job applications");
			}
		};

		fetchJobApplications(); // fetch job applications
	}, [page]);

	return (
		<>
			<JobStatsDisplay jobStats={testingJobStats} />
			<JobAppTable
				jobApplications={jobApplications}
				setJobApplications={setJobApplications}
				page={page}
				setPage={setPage}
				totalPages={totalPages}
			/>
		</>
	);
};
