import { useState } from "react";
import JobAddButton from "./JobAddButton";
import JobSearch from "./JobSearch";

export const JobAppTable: React.FC = () => {
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
				<JobSearch onChange={handleJobSearchChange} />
				<JobAddButton onClick={handleJobAddClick} />
			</div>
			<div id="job-app-table-container"></div>
		</>
	);
};
