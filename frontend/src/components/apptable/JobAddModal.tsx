import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Field,
	Input,
	Label,
	Textarea,
	Transition,
} from "@headlessui/react";

import "./JobAddModal.css";
import { MouseEventHandler, useEffect, useState } from "react";
import { useUserSettings } from "../../hooks/useUserSettings";
import { JobStatus } from "../../types/jobStatus";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { ErrorDisplay } from "../utility/ErrorDisplay";
import { JobApplication } from "../../types/jobApplications";

interface JobAddModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	setJobApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
}

export const JobAddModal: React.FC<JobAddModalProps> = ({
	isOpen,
	setIsOpen,
	setJobApplications,
}) => {
	const [title, setTitle] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [appliedDate, setAppliedDate] = useState<Date>(new Date());
	const [notes, setNotes] = useState<string>("");
	const [statuses, setStatuses] = useState<JobStatus[]>([]);
	const [error, setError] = useState("");

	const { defaultJobStatus } = useUserSettings();

	// handle close modal
	const handleClose = () => {
		setError("");
		setIsOpen(false);
	};

	// set new job form with default status
	const setDefaultJobStatus = (defaultJobStatus: JobStatus) => {
		setStatuses((prevStatuses) => [defaultJobStatus, ...prevStatuses]);
	};

	// get current date for date field
	const getCurrentDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
		event: React.MouseEvent<HTMLElement>
	) => {
		event.preventDefault();

		if (!title || !company || !appliedDate || !statuses) {
			console.log("Error");
			setError("Missing parameters");
			return;
		}

		if (title.length == 0 || company.length == 0 || statuses.length == 0) {
			console.log(title.length);
			console.log(company.length);
			console.log(statuses.length);
			console.log("Error length");
			setError("Missing parameters");
			return;
		}

		try {
			const response = await axios.post<JobApplication>("api/job-application", {
				title: title,
				company: company,
				appliedDate: appliedDate,
				notes: notes,
				statusIds: statuses,
			});

			console.log("NEW JOB RESPONSE");
			console.log(response.data);

			if (response.status === 201) {
				console.log("Job application added successfully.");
				setIsOpen(false);
				// add new job app to job table
				setJobApplications((prevJobApplications) => {
					const newJobApplication = response.data;
					return [newJobApplication, ...prevJobApplications];
				});
			}
		} catch (error) {
			console.log("Failed to add job application.");
		}
	};

	useEffect(() => {
		if (defaultJobStatus && statuses.length === 0) {
			setDefaultJobStatus(defaultJobStatus);
		}
	}, [defaultJobStatus, statuses.length]);

	return (
		<>
			<Transition
				show={isOpen}
				enter="duration-200 ease-out"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="duration-300 ease-out"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Dialog open={isOpen} onClose={handleClose} className="dialog-overlay">
					<div className="dialog-container">
						<ErrorDisplay errorMessage={error} />
						<DialogPanel className="dialog-panel">
							<IoClose className="close-window-icon" onClick={handleClose} />
							<DialogTitle className="dialog-title">
								New Job Application
							</DialogTitle>
							<Description className="dialog-description">
								Fill in new job application details below
							</Description>

							<Field className="form-field-container">
								<Label className="input-label">Job Title</Label>
								<Input
									name="job_title"
									type="text"
									className="input-text"
									onChange={(e) => {
										setTitle(e.target.value);
									}}
								/>
							</Field>

							<Field className="form-field-container">
								<Label className="input-label">Company</Label>
								<Input
									name="company_name"
									type="text"
									className="input-text"
									onChange={(e) => {
										setCompany(e.target.value);
									}}
								/>
							</Field>

							<Field className="form-field-container">
								<Label className="input-label">Date Applied</Label>
								<Input
									name="date_applied"
									type="date"
									defaultValue={getCurrentDate()}
									className="input-text text-center"
									onChange={(e) => {
										setAppliedDate(new Date(e.target.value));
									}}
								/>
							</Field>

							<Field className="form-field-container">
								<Label className="input-label">Notes</Label>
								<Textarea
									name="notes"
									className="input-textarea"
									onChange={(e) => {
										setNotes(e.target.value);
									}}
								/>
							</Field>

							<div className="dialog-buttons">
								<button
									onClick={() => setIsOpen(false)}
									className="dialog-button"
								>
									Cancel
								</button>
								<button onClick={handleSubmit} className="dialog-button">
									Submit
								</button>
							</div>
						</DialogPanel>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
