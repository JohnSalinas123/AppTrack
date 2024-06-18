/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { JobStatus } from "../types/jobStatus";

import { MdNavigateNext } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import axios from "axios";

interface JobStatusScrollProps {
	jobStatuses: JobStatus[];
	jobStatusOptions: JobStatus[];
	jobAppID: number;
}

export const JobStatusScroll: React.FC<JobStatusScrollProps> = ({
	jobStatuses,
	jobStatusOptions,
	jobAppID,
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [statuses, setStatuses] = useState(jobStatuses);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current as HTMLDivElement;

		if (scrollContainer) {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
		}
	}, [statuses]);

	const handleStatusAddClick = async (
		event: React.MouseEvent<HTMLButtonElement>,
		close: () => void
	) => {
		const jobStatusID = event?.currentTarget.value;

		try {
			const response = await axios.post("/api/job-application/add-status", {
				jobStatusID: jobStatusID,
				jobApplicationID: jobAppID,
			});

			const addedJobStatus: JobStatus = response.data;

			console.log(addedJobStatus);

			// update job status state
			setStatuses((prevStatuses) => [...prevStatuses, addedJobStatus]);
			close();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Popover className="relative">
				{({ close }) => (
					<>
						<div className="statuses-container-outer">
							<div
								className="statuses-container-inner"
								ref={scrollContainerRef}
							>
								{statuses.map((jobStatus: JobStatus) => (
									<React.Fragment key={jobStatus._id}>
										<div className="status-element">
											<span>{jobStatus.name}</span>
										</div>
										<MdNavigateNext className="status-divider" />
									</React.Fragment>
								))}
								<PopoverButton>
									<IoIosAddCircle className="status-add" />
								</PopoverButton>
								<Transition
									enter="transition ease-out duration-200"
									enterFrom="opacity-0 translate-y-1"
									enterTo="opacity-100 translate-y-0"
									leave="transition ease-in duration-150"
									leaveFrom="opacity-100 translate-y-0"
									leaveTo="opacity-0 translate-y-1"
								>
									<PopoverPanel anchor="bottom" className="add-status-panel">
										<div className="status-options">
											{jobStatusOptions &&
												jobStatusOptions.map((jobStatusOption) => (
													<button
														key={jobStatusOption._id}
														value={jobStatusOption._id}
														className="status-option"
														onClick={(event) =>
															handleStatusAddClick(event, close)
														}
													>
														{jobStatusOption.name}
													</button>
												))}
										</div>
									</PopoverPanel>
								</Transition>
							</div>
						</div>
					</>
				)}
			</Popover>
		</>
	);
};
