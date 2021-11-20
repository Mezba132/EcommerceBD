import React, {useState} from "react";
import Select from "react-select";
import FileUpload from "./FileUpload";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateProduct = ({ values, handleSubmit, handleChange, selectChange, setValues }) => {

	const { title, description, cost_price, mrp_price, categories, category, subCategories, subs, ship, quantity, images, colors, brands, color, brand, showSubs, shipping, size, sizes, tags } = values

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron ">
				<h1 className="text-center font-weight-bold">Create Product</h1>
				<hr className="my-8"/>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Image Upload </label>
					<div className="col-sm-8 float-right">
						<FileUpload
								values={values}
								setValues={setValues}
								images={images}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Title </label>
					<div className="col-sm-8">
						<input
								type="text"
								className="form-control"
								name="title"
								placeholder="Product Name"
								value={title}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Description </label>
					<div className="col-sm-8">
							<textarea
									rows = "2"
									className="form-control"
									name="description"
									placeholder="Product Description"
									value={description}
									onChange={handleChange}
							/>
							{/*<CKEditor*/}
							{/*	editor = {ClassicEditor}*/}
							{/*	name="description"*/}
							{/*	data = {description}*/}
							{/*	onChange={ ( event, editor ) => {*/}
							{/*		const data = editor.getData();*/}
							{/*		console.log( data );*/}
							{/*	} }*/}
							{/*/>*/}
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Tag </label>
					<div className="col-sm-8">
						<input
								type="text"
								className="form-control"
								name="tags"
								placeholder="Add Tags separated by commas"
								value={tags}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Cost Price </label>
					<div className="col-sm-3">
						<input
								type="number"
								className="form-control"
								name="cost_price"
								placeholder="Cost Price"
								value={cost_price}
								onChange={handleChange}
						/>
					</div>
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> MRP Price </label>
					<div className="col-sm-3">
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
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Quantity </label>
					<div className="col-sm-3">
						<input
								type="number"
								className="form-control"
								name="quantity"
								placeholder="Total Quantity"
								value={quantity}
								onChange={handleChange}
						/>
					</div>
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Shipping </label>
					<div className="col-sm-3">
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
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Size </label>
					<div className="col-sm-3">
						<Select
								isMulti
								isClearable
								name="size"
								placeholder="Select Size"
								options={sizes.map( s => ({
											"value": s,
											"label": s
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
									setValues({...values, size : arr})
								}}
						/>
					</div>
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Color </label>
					<div className="col-sm-3">
						<Select
								isMulti
								isClearable
								name="color"
								placeholder="Select Color"
								options={colors.map( c => ({
											"value": c,
											"label": c
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
									setValues({...values, color : arr})
								}}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Category </label>
					<div className="col-sm-3">
						<Select
								name="category"
								placeholder="Select Category"
								options={categories.map( c => ({
											"value" : c._id,
											"label" : c.name
										})
								)}
								onChange={selectChange}
						/>
					</div>
					{showSubs && subCategories.length > 0 &&
						<React.Fragment>
							<label className="col-sm-2 col-form-label font-weight-bold text-center"> Sub Category </label>
							<div className="col-sm-3">
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
						</React.Fragment>
					}
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Brand </label>
					<div className="col-sm-3">
						<Select
								name="brand"
								placeholder="Select Brand"
								options={brands.map( b => ({
											"value" : b._id,
											"label" : b.name
										})
								)}
								onChange={selectChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<div className="col-sm-10">
						<button
								type="submit"
								className="btn btn-primary btn-md float-right" > Submit
						</button>
					</div>
				</div>



			</div>
		</form>
)}
export default CreateProduct;