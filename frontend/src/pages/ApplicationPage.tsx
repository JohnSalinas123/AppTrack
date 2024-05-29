import { JobAppTable } from "../components/JobAppTable";
import { JobStatsDisplay } from "../components/JobStatsDisplay";
import { JobStat } from "../types/jobStats";

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
	return (
		<>
			<JobStatsDisplay jobStats={testingJobStats} />
			<JobAppTable />
		</>
	);
};
