import React from "react";
import { useEffect, useRef } from "react";
import { JobStatus } from "../types/jobStatus";

import { MdNavigateNext } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

interface JobStatusScrollProps {
	jobStatuses: JobStatus[];
}

export const JobStatusScroll: React.FC<JobStatusScrollProps> = ({
	jobStatuses,
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current as HTMLDivElement;

		if (scrollContainer) {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
		}
	}, [jobStatuses]);

	return (
		<>
			<div className="statuses-container-outer" ref={scrollContainerRef}>
				<div className="statuses-container-inner">
					{jobStatuses.map((jobStatus: JobStatus) => (
						<React.Fragment key={jobStatus.statusID}>
							<div className="status-element">
								<span>{jobStatus.statusName}</span>
							</div>
							<MdNavigateNext className="status-divider" />
						</React.Fragment>
					))}
					<IoIosAddCircle className="status-add" />
				</div>
			</div>
		</>
	);
};
