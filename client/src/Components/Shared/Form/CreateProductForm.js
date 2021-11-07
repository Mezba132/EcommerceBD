import React from "react";
import Select from "react-select";

const CreateProductForm = ({ values, handleSubmit, handleChange, selectChange, setValues }) => {

	const { title, description, cost_price, mrp_price, categories, category, subCategories, subs, ship, quantity, images, colors, brands, color, brand, showSubs } = values

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron">
				<h1 className="text-center font-weight-bold">Create Product</h1>
				<hr className="my-8"/>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Title </label>
					<div className="col-sm-8">
						<input
								type="text"
								className="form-control"
								name="title"
								placeholder="Product Title"
								value={title}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Description </label>
					<div className="col-sm-8">
							<textarea
									rows = "2"
									className="form-control"
									name="description"
									placeholder="Product Description"
									value={description}
									onChange={handleChange}
							/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Cost Price </label>
					<div className="col-sm-8">
						<input
								type="number"
								className="form-control"
								name="cost_price"
								placeholder="Cost Price"
								value={cost_price}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> MRP Price </label>
					<div className="col-sm-8">
						<input
								type="number"
								className="form-control"
								name="mrp_price"
								placeholder="MRP Price"
								value={mrp_price}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Quantity </label>
					<div className="col-sm-8">
						<input
								type="number"
								className="form-control"
								name="quantity"
								placeholder="Total Quantity"
								value={quantity}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Category </label>
					<div className="col-sm-8">
						<Select
								name="category"
								placeholder="Please Select Category"
								options={categories.map( c => ({
											"value" : c._id,
											"label" : c.name
										})
								)}
								onChange={selectChange}
						/>
					</div>
				</div>

				{showSubs && subCategories.length > 0 &&
				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Sub Category </label>
					<div className="col-sm-8">
						<Select
								isMulti
								isClearable
								name="subs"
								placeholder="Please Select Sub Category"
								options={subCategories.map(s => ({
											"value": s._id,
											"label": s.name
										})
								)}
								onChange={(e) => {
									const arr = []
									if(Array.isArray(e)) {
										e.map(x => {
											arr.push(x.value)
										})
									} else {
										return []
									}
									setValues({...values, subs : arr})
								}
								}
						/>
					</div>
				</div>
				}

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Shipping </label>
					<div className="col-sm-8">
						<Select
								name="shipping"
								placeholder="Select Shipping"
								options={ship.map( s => ({
											"value": s,
											"label": s
										})
								)}
								onChange={selectChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Color </label>
					<div className="col-sm-8">
						<Select
								name="color"
								placeholder="Select Color"
								options={colors.map( c => ({
											"value": c,
											"label": c
										})
								)}
								onChange={selectChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold"> Brand </label>
					<div className="col-sm-8">
						<Select
								name="brand"
								placeholder="Select Brand"
								options={brands.map( b => ({
											"value": b,
											"label": b
										})
								)}
								onChange={selectChange}
						/>
					</div>
				</div>

				<button
						type="submit"
						className="btn btn-primary btn-block" > Submit
				</button>

			</div>
		</form>
)}
export default CreateProductForm;