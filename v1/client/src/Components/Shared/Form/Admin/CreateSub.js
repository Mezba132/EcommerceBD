import Select from "react-select";
import React from "react";

const CreateSub = (
		{
			handleSubmit,
			name,
			setName,
			loading,
			categories,
			setCategory,
			setCatName,
			category
		}) => (

		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron">
				<h1 className="text-center font-weight-bold">Create SubCategory </h1>
				<p className="font-weight-bold">Create New SubCategory <span className="text-danger"> * </span> </p>
				<input
						name=""
						placeholder="Add New SubCategory"
						className="form-control mb-3"
						type="text"
						onChange={e => setName(e.target.value)}
						autoFocus
						required
						value={name}
						disabled={loading}
				/>

				<p className="font-weight-bold">Add Category <span className="text-danger"> * </span></p>
				<Select
						isClearable
						className="mb-3"
						placeholder="Please Select Category"
						options={categories.map( c => ({
									"value" : c._id,
									"label" : c.name
								})
						)}
						onChange={e => {
							if(e === null) {
								setCategory("")
								setCatName("")
							}
							else {
								setCategory(e.value)
								setCatName(e.label)
							}
						}}
				/>
				<button
						type="submit"
						className="btn btn-primary btn-block"
						disabled={!name || name.length < 2 || !category || loading}
							> Submit
				</button>
			</div>

		</form>
)

export default CreateSub;