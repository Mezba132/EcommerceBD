import React, {useEffect} from "react";
import Select from "react-select";
import {getSubCategories} from "../../../../Functions/Categoy";
import $ from "jquery";
import daterangepicker from 'daterangepicker'
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import { FetchCategories, FetchBrands } from '../../../../Redux/Actions'

const ListFilter = (
			{
				filteredData,
				setFilteredData,
				loadProducts,
				subCategories,
				colors,
				stockOption,
				values,
				setValues
			}
		) => {

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

		let start = moment().subtract(29, 'days');
		let end = moment();

		const cb = (start, end) => {
			$('#reportrange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
			let UpdatedFilters = {...filteredData}
			UpdatedFilters.filters['createdDate'] = [start, end]
			setFilteredData(UpdatedFilters);
			loadProducts(UpdatedFilters.filters)
		}

		$('#reportrange').daterangepicker({
			startDate: start,
			endDate: end,
			showDropdowns: true,
			minYear: 1901,
			maxYear: parseInt(moment().format('YYYY'),10),
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			}
		}, cb);

		// cb(start, end);



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
				<div className="col-sm-3">
					<span className="font-weight-bold">Date</span>
					<div id="reportrange" className="daterange">
						<i className="fa fa-calendar"></i> &nbsp;
						<span>{start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY')}</span> &nbsp;
						<i className="fa fa-caret-down"></i>
					</div>
				</div>
			</div>
		</span>
	)
}

export default ListFilter;