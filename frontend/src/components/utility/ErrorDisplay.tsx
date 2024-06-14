interface ErrorDisplayProps {
	errorMessage: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
	return (
		<>
			<div className="error-container">
				{errorMessage && (
					<div className="error-display">{`Error: ${errorMessage}`}</div>
				)}
			</div>
		</>
	);
};
