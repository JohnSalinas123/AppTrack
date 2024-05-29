interface JobSearchProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onChange }) => {
	return (
		<input
			type="text"
			placeholder="Search job applications..."
			onChange={onChange}
		/>
	);
};

export default JobSearch;
