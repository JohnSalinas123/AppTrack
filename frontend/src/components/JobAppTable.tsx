import { useState } from "react";
import JobAddButton from "./JobAddButton";
import SearchField from "./SearchField";
import { JobApplication } from "../types/jobApplications";

import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "./JobAppTable.css";
import { JobStatusScroll } from "./JobStatusScroll";
import { JobAddModal } from "./JobAddModal";
import { Combobox } from "@headlessui/react";
import { ErrorDisplay } from "./utility/ErrorDisplay";

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
	const [error] = useState("");

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
			<div id="job-app-table-container">
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
							<th>Data Applied</th>
							<th>Description</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{jobApplications.length > 0 &&
							jobApplications.map((jobApp: JobApplication) => {
								const appDate = new Date(jobApp.applicationDate);
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
										<td>{jobApp.jobTitle}</td>
										<td>{jobApp.companyName}</td>
										<td>{formattedAppDate}</td>
										<td className="descrip-cell">{jobApp.jobDescription}</td>
										<td>
											<JobStatusScroll jobStatuses={jobApp.statuses} />
											<Combobox></Combobox>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<JobAddModal
				isOpen={showJobAddModal}
				setIsOpen={setShowJobAddModal}
				setJobApplications={setJobApplications}
			/>
		</>
	);
};
