import React from "react";

const CreateBrand = ({handleSubmit, name, setName, loading}) => (
		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron">
				<h1 className="text-center font-weight-bold">Create Brand</h1>
				<hr className="my-8"/>
				<p className="font-weight-bold">Create New Brand</p>
				<input
						placeholder="Add New Brand"
						className="form-control mb-2"
						type="text"
						required
						autoFocus
						onChange={e => setName(e.target.value)}
						value={name}
						disabled={loading}
				/>
				<button
						type="submit"
						className="btn btn-primary btn-block"
						disabled={!name || name.length < 2 || loading}> Submit
				</button>
			</div>
		</form>
)

export default CreateBrand;