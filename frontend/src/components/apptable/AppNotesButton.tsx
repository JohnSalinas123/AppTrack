import { FaRegNoteSticky } from "react-icons/fa6";
import { MdNotes } from "react-icons/md";

import "./AppNotesButton.css";
import { useEffect, useState } from "react";

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
		console.log(showModal);
		console.log(notesData);
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
		</>
	);
};
