import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { JobStatus } from "../../types/jobStatus";
import "./JobStatusScroll.css";

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
	statuses: JobStatus[];
	statusOptions: JobStatus[];
	applicationID: number;
}

export const JobStatusScroll: React.FC<JobStatusScrollProps> = ({
	statuses,
	statusOptions,
	applicationID,
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [statusObjects, setStatusObjects] = useState<JobStatus[]>([]);

	useEffect(() => {
		setStatusObjects(statuses);
		const scrollContainer = scrollContainerRef.current as HTMLDivElement;

		if (scrollContainer) {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
		}
	}, [statusObjects, statuses]);

	const handleStatusAddClick = async (
		event: React.MouseEvent<HTMLButtonElement>,
		close: () => void
	) => {
		const jobStatusID = event?.currentTarget.value;

		try {
			const response = await axios.post("/api/job-application/add-status", {
				jobStatusID: jobStatusID,
				jobApplicationID: applicationID,
			});

			const addedJobStatus: JobStatus = response.data;

			console.log(addedJobStatus);

			// update job status state
			setStatusObjects((prevStatuses) => [...prevStatuses, addedJobStatus]);
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
								{statusObjects &&
									statusObjects.map((jobStatus: JobStatus, index) => (
										<React.Fragment key={index}>
											<div
												className={`status-element ${
													index === statusObjects.length - 1
														? "last-status-element"
														: ""
												}`}
											>
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
											{statusOptions &&
												statusOptions.map((statusOption) => (
													<button
														key={statusOption._id}
														value={statusOption._id}
														className="status-option"
														onClick={(event) =>
															handleStatusAddClick(event, close)
														}
													>
														{statusOption.name}
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
