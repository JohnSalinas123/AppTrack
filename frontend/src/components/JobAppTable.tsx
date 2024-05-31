import { useState } from "react";
import JobAddButton from "./JobAddButton";
import SearchField from "./SearchField";
import { JobApplication } from "../types/jobApplications";

import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "./JobAppTable.css";

interface JobAppTableProps {
	jobApplications: JobApplication[];
}

export const JobAppTable: React.FC<JobAppTableProps> = ({
	jobApplications,
}) => {
	const [searchText, setSearchText] = useState("");

	const handleJobSearchChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchText(event.target.value);
	};

	const handleJobAddClick = () => {
		console.log(searchText);
	};

	return (
		<>
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
						{jobApplications.map((jobApp: JobApplication) => (
							<tr
								key={jobApp.dateApplied.toDateString()}
								className="job-data-row"
							>
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
								<td>{jobApp.dateApplied.toDateString()}</td>
								<td>{jobApp.jobDescription}</td>
								<td>{jobApp.jobTitle}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
