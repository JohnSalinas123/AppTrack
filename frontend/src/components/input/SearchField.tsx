import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import "./SearchField.css";

interface SearchFieldProps {
	placeholderText: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
	placeholderText,
	onChange,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={`search-container ${isFocused ? "focused" : ""}`}>
			<IoSearchSharp className="search-icon" />
			<input
				type="text"
				placeholder={placeholderText}
				className="search-field"
				onChange={onChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
};

export default SearchField;
