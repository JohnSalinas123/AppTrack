import { useEffect, useState } from "react";
import JobAddButton from "./JobAddButton";
import SearchField from "../input/SearchField";
import { JobAddModal } from "./JobAddModal";
import { ErrorDisplay } from "../utility/ErrorDisplay";
import "./JobAppTable.css";

import { JobApplication } from "../../types/jobApplications";
import { JobStatus } from "../../types/jobStatus";

import { FaTrash, FaRegEdit, FaSortDown } from "react-icons/fa";
import axios from "axios";
import { AppNotesButton } from "./AppNotesButton";
import { JobStatusScroll } from "./JobStatusScroll";

interface JobAppTableProps {
	jobApplications: JobApplication[];
	setJobApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
}

export const JobAppTable: React.FC<JobAppTableProps> = ({
	jobApplications,
	setJobApplications,
}) => {
	const [searchText, setSearchText] = useState("");
	const [showJobAddModal, setShowJobAddModal] = useState(false);
	const [statusOptions, setStatusOptions] = useState<JobStatus[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchUserJobStatuses();
	}, []);

	// fetch user's job statuses
	const fetchUserJobStatuses = async () => {
		try {
			const response = await axios.get("/api/job-statuses");
			console.log(response.data);
			setStatusOptions(response.data);
		} catch (error) {
			console.log(error); // REMOVE
			setError("Failed to fetch job statuses");
		}
	};

	const handleJobSearchChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchText(event.target.value);
		console.log(searchText);
	};

	const handleJobAddClick = () => {
		console.log(showJobAddModal);
		setShowJobAddModal(true);
	};

	return (
		<>
			<ErrorDisplay errorMessage={error} />
			<div id="job-app-controls">
				<SearchField
					placeholderText="Search job applications..."
					onChange={handleJobSearchChange}
				/>
				<JobAddButton onClick={handleJobAddClick} />
			</div>
			<table id="job-table">
				<thead>
					<tr>
						<th>
							<input
								type="checkbox"
								id="checkbox-all"
								name="selectAlljobs"
								value="alljobs"
							/>
						</th>
						<th></th>
						<th></th>
						<th>Title</th>
						<th>Company</th>
						<th>
							<div className="flex-row flex-center">
								<span>Data Applied</span>
								<FaSortDown className="sort-order-toggle" />
							</div>
						</th>
						<th>Notes</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{jobApplications.length > 0 &&
						jobApplications.map((jobApp: JobApplication) => {
							const appDate = new Date(jobApp.appliedDate);
							const formattedAppDate = `${appDate.getMonth()}/${appDate.getDay()}/${appDate.getFullYear()}`;
							return (
								<tr key={jobApp._id} className="job-data-row">
									<td>
										<input
											type="checkbox"
											className="checkbox-current"
											name="selectAlljobs"
											value="alljobs"
										/>
									</td>
									<td>
										<FaTrash />
									</td>
									<td>
										<FaRegEdit />
									</td>
									<td className="title-cell">{jobApp.title}</td>
									<td>{jobApp.company}</td>
									<td className="date-cell">{formattedAppDate}</td>
									<td className="notes-cell">
										<AppNotesButton notes={jobApp.notes} />
									</td>
									<td>
										<JobStatusScroll
											statuses={jobApp.statusIds}
											statusOptions={statusOptions}
											applicationID={jobApp._id}
										/>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<JobAddModal
				isOpen={showJobAddModal}
				setIsOpen={setShowJobAddModal}
				setJobApplications={setJobApplications}
			/>
		</>
	);
};
