/* eslint-disable @typescript-eslint/no-unused-vars */
import { JobStat } from "../types/jobStats";
import "./JobStatsDisplay.css";

interface JobStatsDisplayProps {
	jobStats: JobStat[];
}

export const JobStatsDisplay: React.FC<JobStatsDisplayProps> = ({
	jobStats,
}) => {
	return (
		<>
			<div id="job-stats-display">
				{jobStats.map((stat) => (
					<div key={stat.jobStatName} className="job-stat-container">
						<div className="job-stat-element">
							<span className="job-stat-name">
								{stat.jobStatName || "Error"}:
							</span>
							<span className="job-stat-count">{stat.jobStatCount || 0}</span>
						</div>
						<div className="triangle-container">
							<img className="triangle" src="./triangle_right.svg" />
						</div>
					</div>
				))}
			</div>
		</>
	);
};
