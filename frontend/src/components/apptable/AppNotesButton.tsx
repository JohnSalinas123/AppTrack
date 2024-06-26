import { FaRegNoteSticky } from "react-icons/fa6";
import { MdNotes } from "react-icons/md";

import "./AppNotesButton.css";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Field,
	Transition,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface AppNotesButtonProps {
	notes: string;
}

export const AppNotesButton: React.FC<AppNotesButtonProps> = ({ notes }) => {
	const [notesData, setNotesData] = useState<string>(notes);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		// set notes data state with notes prop
		setNotesData(notes);
	}, [notes]);

	const handleButtonClick = () => {
		// show notes modal form
		setShowModal(true);
	};

	const handleSaveNotes = () => {
		console.log(notesData);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="button-container">
				<button
					type="button"
					className={`button-box ${notesData.length == 0 ? "empty-notes" : ""}`}
					onClick={handleButtonClick}
				>
					<FaRegNoteSticky className="empty-notes-icon" />
					{notesData && <MdNotes className="notes-icon" />}
				</button>
			</div>
			<Transition
				show={showModal}
				enter="duration-200 ease-out"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="duration-300 ease-out"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Dialog
					open={showModal}
					onClose={handleClose}
					className="dialog-overlay"
				>
					<div className="dialog-container">
						<DialogPanel className="dialog-panel">
							<IoClose className="close-window-icon" onClick={handleClose} />
							<DialogTitle className="dialog-title">Notes</DialogTitle>

							<Field className="form-field-container">
								<textarea
									name="job_title"
									value={notesData}
									className="notes-textarea"
									onChange={(e) => {
										console.log(e.target.value);
										setNotesData(e.target.value);
									}}
								/>
							</Field>

							<div className="dialog-buttons">
								<button onClick={handleSaveNotes} className="dialog-button">
									Save
								</button>
							</div>
						</DialogPanel>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
