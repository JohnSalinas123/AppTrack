/* eslint-disable @typescript-eslint/no-unused-vars */
import { JobStat } from "../types/jobStats";
import "../resources/triangle_right.svg";
import "./JobStatsDisplay.css";
import triangleSVG from "../resources/triangle_right_solid.svg";

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
							<img className="triangle" src={triangleSVG} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};
