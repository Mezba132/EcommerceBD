import React from "react";

const LocalSearch = ({keyword, setKeyword}) => {

	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	}

	return (
		<input
				type="text"
				className="form-control-sm float-right mb-4"
				placeholder="Search Category"
				value={keyword}
				onChange={handleSearchChange}
		/>
	)
}

export default LocalSearch;