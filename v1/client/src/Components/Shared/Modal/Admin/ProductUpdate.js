import React from "react";
import Modal from '../index'
import FileUpload from "../../Form/Admin/FileUpload";
import Select from "react-select";
import {getSubCategories} from "../../../../Functions/Categoy";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";

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
									value={values.title || ""}
									onChange={handleChange}
							/>
						</div>
						<label className="col-form-label font-weight-bold text-center"> Description </label>
						<div>
									<CKEditor
											editor = {ClassicEditor}
											data = {values.description}
									/>

						</div>
						<label className=" col-form-label font-weight-bold text-center"> Tag </label>
						<div>
							<input
									type="text"
									className="form-control"
									name="tags"
									placeholder="Add Tags separated by commas"
									value={values.tags || ""}
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
									value={values.cost_price || ""}
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
									value={values.mrp_price || ""}
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
									value={values.quantity || ""}
									onChange={handleChange}
							/>
						</div>
						<label className=" col-form-label font-weight-bold text-center"> Shipping </label>
						<div>
							<Select
									value={{value: values.shipping || "", label: values.shipping}}
									name="shipping"
									placeholder="Select Shipping"
									options={values.ship.map(s => ({
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
									value={values.size.map(s => ({
												"value": s || "",
												"label": s
											})
									)}
									placeholder="Select Size"
									options={values.sizes.map(s => ({
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
									value={values.color.map(co => ({
												"value": co || "",
												"label": co
											})
									)}
									placeholder="Select Color"
									options={values.colors.map(c => ({
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
									value={{value: values.getCatById._id || "", label: values.category.name || values.getCatById.name}}
									options={values.categories.map(c => ({
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
									value={values.subList.map(sub => ({
												"value": sub._id || sub.value,
												"label": sub.name || sub.label
											})
									)}
									placeholder="Please Select Sub Category"
									options={values.subCategories.map(s => ({
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
									value={{value: values.getBrandById._id || "", label: values.getBrandById.name}}
									placeholder="Select Brand"
									options={values.brands.map(b => ({
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
	/>
)}

export default ProductUpdate;