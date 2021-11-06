import React from "react";

const CreateCategoryForm = ({handleSubmit, name, setName, loading}) => (
		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron mt-4">
				<h1 className="text-center font-weight-bold">Create Category</h1>
				<hr className="my-8"/>
				<p className="font-weight-bold">Create New Category</p>
				<input
						name=""
						placeholder="Add New Category"
						className="form-control mb-2"
						type="text"
						onChange={e => setName(e.target.value)}
						value={name}
						disabled={loading}
				/>
				<button
						type="submit"
						className="btn btn-primary btn-block"
						disabled={!name || name.length < 2 || loading} > Submit
				</button>
			</div>
		</form>
)

export default CreateCategoryForm;