import React from "react";
import Modal from '../index'
import FileUpload from "../../Form/Admin/FileUpload";
import Select from "react-select";
import {getSubCategories} from "../../../../Functions/Categoy";

const ProductUpdate = (
			{
				values,
				setValues,
				showUpdateModal,
				onCancelUpdateHandler,
				handleChange,
				selectChange,
				updateFormSubmit
			}
		) => {

	const {
		title,
		description,
		cost_price,
		mrp_price,
		categories,
		getCatById,
		category,
		subCategories,
		subList,
		subs,
		ship,
		quantity,
		images,
		colors,
		brands,
		color,
		getBrandById,
		brand,
		size,
		shipping,
		sizes,
		tags,
		tagList
	} = values

	return(
	<Modal
			show={showUpdateModal}
			onCancel={onCancelUpdateHandler}
			header={`Update "${values.title}" Product`}
			modal_body={"pro_height"}
			children={
				<div>
					<div className="form-group">

						<label className="col-form-label font-weight-bold text-center"> Image Upload </label>
						<div>
							<FileUpload
									values={values}
									setValues={setValues}
							/>
						</div>

						<label className="col-form-label font-weight-bold text-left"> Title </label>
						<div>
							<input
									type="text"
									className="form-control"
									name="title"
									placeholder="Product Name"
									value={title || ""}
									onChange={handleChange}
							/>
						</div>
						<label className="col-form-label font-weight-bold text-center"> Description </label>
						<div>
										<textarea
												rows="2"
												className="form-control"
												name="description"
												placeholder="Product Description"
												value={description || ""}
												onChange={handleChange}
										/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Tag </label>
						<div>
							<input
									type="text"
									className="form-control"
									name="tags"
									placeholder="Add Tags separated by commas"
									value={tags || ""}
									onChange={handleChange}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Cost Price </label>
						<div>
							<input
									type="number"
									className="form-control"
									name="cost_price"
									placeholder="Cost Price"
									value={cost_price || ""}
									onChange={handleChange}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> MRP Price </label>
						<div>
							<input
									type="number"
									className="form-control"
									name="mrp_price"
									placeholder="MRP Price"
									value={mrp_price || ""}
									onChange={handleChange}
							/>
						</div>
						<label className="col-form-label font-weight-bold text-center"> Quantity </label>
						<div>
							<input
									type="number"
									className="form-control"
									name="quantity"
									placeholder="Total Quantity"
									value={quantity || ""}
									onChange={handleChange}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Shipping </label>
						<div>
							<Select
									value={{value: shipping || "", label: shipping}}
									name="shipping"
									placeholder="Select Shipping"
									options={ship.map(s => ({
												"value": s,
												"label": s
											})
									)}
									onChange={selectChange}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Size </label>
						<div className="">
							<Select
									isMulti
									isClearable
									value={size.map(s => ({
												"value": s || "",
												"label": s
											})
									)}
									placeholder="Select Size"
									options={sizes.map(s => ({
												"value": s,
												"label": s,
											})
									)}
									onChange={(e) => {
										const arr = []
										if (Array.isArray(e)) {
											e.map(x => {
												arr.push(x.value)
											})
										} else {
											return []
										}
										setValues({...values, size: arr})
									}
									}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Color </label>
						<div className="">
							<Select
									isMulti
									isClearable
									value={color.map(co => ({
												"value": co || "",
												"label": co
											})
									)}
									placeholder="Select Color"
									options={colors.map(c => ({
												"value": c,
												"label": c
											})
									)}
									onChange={(e) => {
										const arr = []
										if (Array.isArray(e)) {
											e.map(x => {
												arr.push(x.value)
											})
										} else {
											return []
										}
										setValues({...values, color: arr})
									}}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Category </label>
						<div>
							<Select
									name="category"
									placeholder="Select Category"
									value={{value: getCatById._id || "", label: category.name || getCatById.name}}
									options={categories.map(c => ({
												"value": c._id,
												"label": c.name
											})
									)}
									onChange={e => {
										getSubCategories(e.value)
												.then(res => {
													setValues({
														...values,
														getCatById: {value: e.value, name: e.label},
														category: e.value,
														subCategories: res.data,
														subList: [],
														subs: []
													})
												})
									}}
							/>
						</div>
						<label className="col-form-label font-weight-bold text-center"> Sub Category </label>
						<div>
							<Select
									isMulti
									isClearable
									value={subList.map(sub => ({
												"value": sub._id || sub.value,
												"label": sub.name || sub.label
											})
									)}
									placeholder="Please Select Sub Category"
									options={subCategories.map(s => ({
												"value": s._id,
												"label": s.name
											})
									)}
									onChange={(e) => {
										const arr = [];
										let subArr = [];
										if (Array.isArray(e)) {
											e.map(x => {
												arr.push(x.value)
												subArr.push(x)
											})
										} else {
											return []
										}
										setValues({...values, subList: subArr, subs: arr})
									}
									}
							/>
						</div>
						<label className="col-form-label font-weight-bold text-center"> Brand </label>
						<div>
							<Select
									name="brand"
									value={{value: getBrandById._id || "", label: getBrandById.name}}
									placeholder="Select Brand"
									options={brands.map(b => ({
												"value": b._id,
												"label": b.name,
											})
									)}
									onChange={e => {
										setValues({
											...values,
											brand: e.value,
											getBrandById: {value: e.value, name: e.label}
										})
									}}
							/>
						</div>

					</div>
				</div>
			}
			footer={
				<React.Fragment>
					<button
							type="submit"
							className="btn btn-primary float-right ant-btn-lg"> Update
					</button>
					<span
							className="btn btn-warning float-right ant-btn-lg mr-3"
							onClick={onCancelUpdateHandler}> Cancel
                              </span>
				</React.Fragment>
			}
			onSubmit={updateFormSubmit}
			footerClass="mb-5"
	>
	</Modal>
)}

export default ProductUpdate;