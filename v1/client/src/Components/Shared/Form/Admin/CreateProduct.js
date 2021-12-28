import React, {useEffect, useState} from "react";
import Select from "react-select";
import FileUpload from "./FileUpload";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FetchCategories, FetchBrands } from '../../../../Redux/Actions'
import {useDispatch, useSelector} from "react-redux";

const CreateProduct = ({ values, handleSubmit, handleChange, selectChange, setValues }) => {

	const dispatch = useDispatch()

	const { category, brand } = useSelector(state => state)
	const categories = category.getCategories
	const brands = brand.getBrands

	useEffect(() => {
		let isMounted = true
		if(isMounted) {
			dispatch(FetchCategories())
			dispatch(FetchBrands())
		}
		// cleanup
		return () => { isMounted = false }
	},[dispatch])

	const { title, description, cost_price, mrp_price, subCategories, subs, ship, quantity, images, colors, color,  showSubs, shipping, size, sizes, tags } = values

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group jumbotron ">
				<h1 className="text-center font-weight-bold">Create Product</h1>
				<hr className="my-8"/>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Image Upload <span className="text-danger"> * </span> </label>
					<div className="col-sm-8 float-right">
						<FileUpload
								values={values}
								setValues={setValues}
								images={images}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Title <span className="text-danger"> * </span> </label>
					<div className="col-sm-8">
						<input
								type="text"
								className="form-control"
								name="title"
								placeholder="Product Name"
								required
								value={title}
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Description <span className="text-danger"> * </span> </label>
					<div className="col-sm-8">
							<CKEditor
								editor = {ClassicEditor}
								name="description"
								data = {description}
								onChange={ ( event, editor ) => {
									const data = editor.getData();
									setValues({...values, ['description'] : data})
								}}
							/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Tag <span className="text-danger"> * </span> </label>
					<div className="col-sm-8">
						<input
								type="text"
								className="form-control"
								name="tags"
								placeholder="Add Tags separated by commas"
								value={tags}
								required
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Cost Price <span className="text-danger"> * </span> </label>
					<div className="col-sm-3">
						<input
								type="number"
								className="form-control"
								name="cost_price"
								placeholder="Cost Price"
								value={cost_price}
								required
								onChange={handleChange}
						/>
					</div>
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> MRP Price <span className="text-danger"> * </span></label>
					<div className="col-sm-3">
						<input
								type="number"
								className="form-control"
								name="mrp_price"
								placeholder="MRP Price"
								value={mrp_price}
								required
								onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Quantity <span className="text-danger"> * </span></label>
					<div className="col-sm-3">
						<input
								type="number"
								className="form-control"
								name="quantity"
								placeholder="Total Quantity"
								value={quantity}
								required
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
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Category <span className="text-danger"> * </span></label>
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
							<label className="col-sm-2 col-form-label font-weight-bold text-center"> Sub Category <span className="text-danger"> * </span></label>
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
					<label className="col-sm-2 col-form-label font-weight-bold text-center"> Brand <span className="text-danger"> * </span></label>
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