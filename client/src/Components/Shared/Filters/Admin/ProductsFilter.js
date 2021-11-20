import React from "react";
import Select from "react-select";
import {getSubCategories} from "../../../../Functions/Categoy";

const ListFilter = (
			{
				categories,
				filteredData,
				setFilteredData,
				loadProducts,
				subCategories,
				brands,
				colors,
				stockOption,
				values,
				setValues
			}
		) => {
	return (
		<span className="row border border-info">
			<div className="row col-md-12 m-2">
				<div className="col-sm-3">
					<span className="font-weight-bold">Category</span>
					<Select
							isClearable
							name="category"
							placeholder="Select Category"
							options={categories.map( c => ({
										"value" : c._id || "",
										"label" : c.name,
										"name"  : "category"
									})
							)}
							onChange={e => {
								if(e === null) {
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters['category'] = ""
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
								else {
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters[e.name] = e.value
									getSubCategories(e.value)
											.then(res => {
												setValues({...values, subCategories: res.data})
											})
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
							}}
					/>
				</div>
				<div className="col-sm-3">
					<span className="font-weight-bold">Sub Category</span>
					<Select
							isMulti
							isClearable
							placeholder="Add Sub-Category"
							options={subCategories.map(s => ({
										"value": s._id,
										"label": s.name
									})
							)}
							onChange={e => {
								if(e === null)
								{
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters["subs"] = ""
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
								else
								{
									const arr = []
									if(Array.isArray(e)) {
										e.map(x => {
											arr.push(x.value)
										})
									} else {
										return []
									}
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters["subs"] = arr
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
							}}

					/>
				</div>
				<div className="col-sm-3">
					<span className="font-weight-bold">Brand</span>
					<Select
							isClearable
							placeholder="Add Brand"
							options={brands.map(b => ({
										"value": b._id,
										"label": b.name,
										"name": "brand"
									})
							)}
							onChange={e => {
								if(e === null) {
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters['brand'] = ""
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
								else {
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters[e.name] = e.value
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
							}}
					/>
				</div>
				<div className="col-sm-3">
					<span className="font-weight-bold">Color</span>
					<Select
							isMulti
							isClearable
							placeholder="Select Color"
							options={colors.map(c => ({
										"value": c,
										"label": c
									})
							)}
							className="mb-2"
							onChange={e => {
								if(e === null)
								{
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters["color"] = ""
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
								else
								{
									const arr = []
									if(Array.isArray(e)) {
										e.map(x => {
											arr.push(x.value)
										})
									} else {
										return []
									}
									let UpdatedFilters = {...filteredData}
									UpdatedFilters.filters["color"] = arr
									setFilteredData(UpdatedFilters);
									loadProducts(UpdatedFilters.filters)
								}
							}}
					/>
				</div>
				<div className="col-sm-3">
					<span className="font-weight-bold">Stock</span>
					<Select
							isClearable
							placeholder="Add Sub-Category"
							options={stockOption}
					/>
				</div>
			</div>
		</span>
	)
}

export default ListFilter;