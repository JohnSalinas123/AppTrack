interface JobAddButtonProps {
	onClick: () => void;
}

const JobAddButton: React.FC<JobAddButtonProps> = ({ onClick }) => {
	return (
		<button id="job-add-button" onClick={onClick}>
			Add Job Application
		</button>
	);
};

export default JobAddButton;
