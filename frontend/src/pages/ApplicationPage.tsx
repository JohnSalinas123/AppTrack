import { JobAppTable } from "../components/JobAppTable";
import { JobStatsDisplay } from "../components/JobStatsDisplay";
import { JobStat } from "../types/jobStats";
import { JobApplication } from "../types/jobApplications";

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

const testingJobApps: JobApplication[] = [
	{
		jobTitle: "Software Engineer",
		companyName: "Google",
		dateApplied: new Date("2023-01-15"),
		jobDescription: "Developing scalable web applications.",
		statuses: [
			{ statusName: "Applied", statusID: 1 },
			{ statusName: "Interview", statusID: 2 },
			{ statusName: "Offer", statusID: 3 },
		],
	},
	{
		jobTitle: "Frontend Developer",
		companyName: "Facebook",
		dateApplied: new Date("2023-02-20"),
		jobDescription: "Building user interfaces with React.",
		statuses: [
			{ statusName: "Applied", statusID: 1 },
			{ statusName: "Coding Challenge", statusID: 4 },
		],
	},
	{
		jobTitle: "Backend Developer",
		companyName: "Amazon",
		dateApplied: new Date("2023-03-05"),
		jobDescription: "Working on server-side logic and database management.",
		statuses: [
			{ statusName: "Applied", statusID: 1 },
			{ statusName: "Phone Screen", statusID: 5 },
			{ statusName: "Onsite Interview", statusID: 6 },
		],
	},
	{
		jobTitle: "Full Stack Developer",
		companyName: "Microsoft",
		dateApplied: new Date("2023-04-10"),
		jobDescription: "Developing both frontend and backend applications.",
		statuses: [
			{ statusName: "Applied", statusID: 1 },
			{ statusName: "Interview", statusID: 2 },
		],
	},
	{
		jobTitle: "Data Scientist",
		companyName: "Apple",
		dateApplied: new Date("2023-05-25"),
		jobDescription: "Analyzing data to gain insights for product development.",
		statuses: [
			{ statusName: "Applied", statusID: 1 },
			{ statusName: "Technical Interview", statusID: 7 },
			{ statusName: "Offer", statusID: 3 },
		],
	},
];

export const ApplicationPage = () => {
	return (
		<>
			<JobStatsDisplay jobStats={testingJobStats} />
			<JobAppTable jobApplications={testingJobApps} />
		</>
	);
};
