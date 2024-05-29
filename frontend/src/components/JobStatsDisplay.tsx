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
			<ul id="job-stat-container">
				{jobStats.map((stat) => (
					<>
						<li key={stat.jobStatName} className="job-stat-element">
							<span className="job-stat-name">
								{stat.jobStatName || "Error"}:
							</span>
							<span className="job-stat-count">{stat.jobStatCount || 0}</span>
						</li>
						<div className="triangle-container">
							<img className="triangle" src="./triangle_right.svg" />
						</div>
					</>
				))}
			</ul>
		</>
	);
};
