import React from "react";
import Select from "react-select";
import FileUpload from "./FileUpload";
import {DeleteTwoTone, PlusCircleTwoTone} from "@ant-design/icons";

const MultiProductForm = (
		{   values,
			setValues,
			handleChange,
			selectChange,
			handleSubmit,
			showSubs,
			handleAddMore,
			handleRemove,
			multiple
		}) => {

	return (
		<form onSubmit={handleSubmit}>
			{values.map((item, index) => (
				<span className="row mt-3 border border-info" key={`item-${index}`}>
					<div className="row m-2">
						<div className="col-sm-2">
							<span className="font-weight-bold">Title</span>
							<input
								type="text"
								className="form-control mb-2"
								name="title"
								placeholder="Product Title"
								value={item.title}
								onChange={e => handleChange(index, e)}

							/>
						</div>
						<div className="col-sm-2">
							<span className="font-weight-bold">Description</span>
							<textarea
								className="form-control mb-2"
								name="description"
								placeholder="Product Description"
								value={item.description}
								onChange={e => handleChange(index, e)}

							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Cost Price</span>
							<input
								type="number"
								className="form-control mb-2"
								name="cost_price"
								placeholder="Cost Price"
								value={item.cost_price}
								onChange={e => handleChange(index, e)}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">MRP Price</span>
							<input
								type="number"
								className="form-control mb-2"
								name="mrp_price"
								placeholder="MRP Price"
								value={item.mrp_price}
								onChange={e => handleChange(index, e)}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Quantity</span>
							<input
								type="number"
								className="form-control mb-2"
								name="quantity"
								placeholder="Total Quantity"
								value={item.quantity}
								onChange={e => handleChange(index, e)}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Tag</span>
							<input
									type="text"
									className="form-control mb-2"
									name="tags"
									placeholder="Add Tags separated by commas"
									value={item.tags}
									onChange={e => handleChange(index, e)}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Shipping</span>
							<Select
								placeholder="Select Shipping"
								options={item.ship.map(s => ({
											"value": s,
											"label": s,
											"name": "shipping"
										})
								)}
								className="mb-2"
								onChange={(e) => selectChange(index, e)}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Color</span>
							<Select
								isMulti
								isClearable
								placeholder="Select Color"
								options={item.colors.map(c => ({
											"value": c,
											"label": c
										})
								)}
								className="mb-2"
								onChange={(e) => {
									const arr = []
									if (Array.isArray(e)) {
										e.map(x => {
											arr.push(x.value)
										})
									} else {
										return []
									}

									let data = [...values];
									data[index]['color'] = arr;
									setValues(data);
									}
								}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Brand</span>
							<Select
								placeholder="Add Brand"
								options={item.brands.map(b => ({
											"value": b._id,
											"label": b.name,
											"name": "brand"
										})
								)}
								className="mb-2"
								onChange={(e) => selectChange(index, e)}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Size</span>
							<Select
									isMulti
									isClearable
									placeholder="Select Size"
									options={item.sizes.map(s => ({
												"value": s,
												"label": s
											})
									)}
									className="mb-2"
									onChange={(e) => {
										const arr = []
										if (Array.isArray(e)) {
											e.map(x => {
												arr.push(x.value)
											})
										} else {
											return []
										}

										let data = [...values];
										data[index]['size'] = arr;
										setValues(data);
										}
									}
							/>
						</div>

						<div className="col-sm-2">
							<span className="font-weight-bold">Category</span>
							<Select
									placeholder="Add Category"
									options={item.categories.map(c => ({
												"value": c._id,
												"label": c.name,
												"name": "category"
											})
									)}
									onChange={(e) => selectChange(index, e)}
							/>
						</div>

						{showSubs && item.subCategories.length > 0 &&
							<div className="col-sm-2">
								<span className="font-weight-bold">Sub Category</span>
								<Select
									isMulti
									isClearable
									placeholder="Add Sub-Category"
									options={item.subCategories.map(s => ({
												"value": s._id,
												"label": s.name
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

										let data = [...values];
										data[index]['subs'] = arr;
										setValues(data);
										}
									}
								/>
							</div>
						}

						<div className="col-sm-3">
							<span className="font-weight-bold">Upload Images</span>
							<FileUpload
								values={item}
								arrays={values}
								setValues={setValues}
								multiple={multiple}
								index={index}
							/>
						</div>

					</div>

					<hr className="my-8"/>


					<span
							onClick={(index) => handleRemove(index)}
							className="btn btn-md">
                              <DeleteTwoTone twoToneColor="#eb2f96" style={{ fontSize: '25px' }}/>
                    </span>
					<span
							onClick={(e) => handleAddMore(e)}
							className="btn btn-md" >
								<PlusCircleTwoTone style={{ fontSize: '25px' }}/>
                    </span>
				</span>
			))}
		</form>
	)}

export default MultiProductForm;