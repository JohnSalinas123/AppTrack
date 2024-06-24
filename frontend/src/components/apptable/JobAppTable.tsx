import { useEffect, useState } from "react";
import JobAddButton from "./JobAddButton";
import SearchField from "../input/SearchField";
import { JobAddModal } from "./JobAddModal";
import { ErrorDisplay } from "../utility/ErrorDisplay";
import "./JobAppTable.css";

import { JobApplication } from "../../types/jobApplications";
import { JobStatus } from "../../types/jobStatus";

import {
	FaTrash,
	FaRegEdit,
	FaSortDown,
	FaArrowLeft,
	FaArrowRight,
} from "react-icons/fa";
import axios from "axios";
import { AppNotesButton } from "./AppNotesButton";
import { JobStatusScroll } from "./JobStatusScroll";

interface JobAppTableProps {
	jobApplications: JobApplication[];
	setJobApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	totalPages: number;
}

export const JobAppTable: React.FC<JobAppTableProps> = ({
	jobApplications,
	setJobApplications,
	page,
	setPage,
	totalPages,
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

	const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);

		let pageNumber = Number(event.target.value);

		// validate page number
		if (pageNumber <= 0 || pageNumber > totalPages) {
			pageNumber = 1;
		}

		setPage(pageNumber);
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
						jobApplications
							.slice(0, 10)
							.map((jobApp: JobApplication, index) => {
								const appDate = new Date(jobApp.appliedDate);
								const formattedAppDate = `${
									appDate.getMonth() + 1
								}/${appDate.getDate()}/${appDate.getFullYear()}`;
								return (
									<tr key={index} className="job-data-row">
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
										<td className="title-cell">
											<div className="title-cell flex-center">
												<div className="tooltip">
													<div className="tooltip-main">{jobApp.title}</div>
													<span className="tooltiptext">{jobApp.title}</span>
												</div>
											</div>
										</td>
										<td className="company-cell">{jobApp.company}</td>
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
					{[...Array(Math.max(0, 10 - jobApplications.length))].map(
						(_, index) => (
							<tr key={`empty-${index}`} className="job-data-row empty-row">
								<td></td>
								<td></td>
								<td></td>
								<td className="title-cell"></td>
								<td></td>
								<td className="date-cell"></td>
								<td className="notes-cell"></td>
								<td></td>
							</tr>
						)
					)}
				</tbody>
			</table>
			<div className="page-controls">
				<button
					className="page-button previous"
					onClick={() => {
						if (page - 1 > 0) {
							const prevPage = page - 1;
							setPage(prevPage);
						}
					}}
				>
					<FaArrowLeft />
				</button>
				<input
					className="page-input"
					type="number"
					value={page}
					onChange={handlePageChange}
				/>
				<span className="page-total">{`of ${totalPages}`}</span>

				<button
					className="page-button next"
					onClick={() => {
						if (page + 1 <= totalPages) {
							const nextPage = page + 1;
							setPage(nextPage);
						}
					}}
				>
					<FaArrowRight />
				</button>
			</div>
			<JobAddModal
				isOpen={showJobAddModal}
				setIsOpen={setShowJobAddModal}
				setJobApplications={setJobApplications}
			/>
		</>
	);
};
