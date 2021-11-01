import React from "react";

const LocalSearch = ({keyword, setKeyword}) => {

	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
		console.log(e.target.value)
	}

	return (
		<input
				type="text"
				className="form-control-sm float-right m-2"
				placeholder="Search Category"
				value={keyword}
				onChange={handleSearchChange}
		/>
	)
}

export default LocalSearch;