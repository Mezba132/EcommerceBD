import Select from "react-select";
import React from "react";

const CreateSubForm = ({handleSubmit,name,setName,loading,categories,setCategory,setCatName}) => (

		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron">
				<h1 className="text-center font-weight-bold">Create SubCategory</h1>
				<p className="font-weight-bold">Create New SubCategory</p>
				<input
						name=""
						placeholder="Add New SubCategory"
						className="form-control mb-3"
						type="text"
						onChange={e => setName(e.target.value)}
						autoFocus
						value={name}
						disabled={loading}
				/>

				<p className="font-weight-bold">Add Parent Category</p>
				<Select
						className="mb-3"
						placeholder="Please Select Category"
						options={categories.map( c => ({
									"value" : c._id,
									"label" : c.name
								})
						)}
						onChange={e => {
							setCategory(e.value)
							setCatName(e.label)
						}}
				/>
				<button
						type="submit"
						className="btn btn-primary btn-block"
						disabled={!name || name.length < 2 || loading} > Submit
				</button>
			</div>

		</form>
)

export default CreateSubForm;