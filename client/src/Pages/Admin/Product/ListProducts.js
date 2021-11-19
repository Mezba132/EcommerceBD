import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import { getProducts, removeProduct, getProduct, updateProduct } from "../../../Functions/Product";
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {Avatar} from "antd";
import Modal from "../../../Components/Shared/Modal";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import Select from "react-select";
import FileUpload from "../../../Components/Shared/Form/FileUploadForm";
import {
	getCategories,
	getSubCategories
} from '../../../Functions/Categoy'
import { getBrands } from '../../../Functions/Brand'
import ReactPaginate from 'react-paginate'

const initialState = {
	title:'',
	description:'',
	cost_price:'',
	mrp_price:'',
	quantity:'',
	categories:[],
	getCatById:{},
	category:"",
	images:[],
	subCategories:[],
	subs:[],
	subList:[],
	ship:["Yes","No"],
	shipping:'',
	brands:[],
	getBrandById:{},
	brand:'',
	colors:["Black", "Brown", "Silver", "White", "Blue"],
	color:[],
	sizes:['SM','M','L','XL','XXL'],
	size:[],
	tagList:[],
	tags:''
}

const ListProducts = () => {

	const [products, setProducts] = useState([])
	const [keyword, setKeyword] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [slug, setSlug] = useState('');
	const [values, setValues] = useState(initialState);
	const [pageNumber, setPageNumber] = useState(0)

	const { user } = useSelector(user => user)

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

	useEffect(() => {
		loadProducts();
		loadFields();
	},[])

	const loadProducts = () => {
		getProducts()
				.then(res => {
					setProducts(res.data);
				})
				.catch(err => {
					console.log(err);
				})
	}

	const loadFields = () => {
		getCategories().then(category => {
			getBrands().then(brand => {
				setValues({...values, categories: category.data, brands: brand.data})
			})
		})
	}

	const onOpenDeleteHandler = (slug) => {
		setShowDeleteModal(true);
		setSlug(slug);
	};

	const onCancelDeleteHandler = () => {
		setShowDeleteModal(false);
		setSlug('');
	};

	const onConfirmDeleteHandler = () => {
		removeProduct(slug, user.idToken)
				.then(res => {
					setShowDeleteModal(false);
					toast.success(`${res.data.title} deleted Successfully`)
					loadProducts();
				})
				.catch(err => {
					toast.error( `Product deleted Failed`)
				})
	}

	const onOpenUpdateHandler = (slug) => {
		setShowUpdateModal(true);
		setSlug(slug);
		getProduct(slug)
			.then(res => {
				let value = res.data;
				// console.log(value)
				getSubCategories(value.category._id)
					.then(sub =>
					{
						let subArr = [];
						value.subs.map(s => {
							subArr.push(s._id)
						})
						console.log(subArr)
						setValues({...values,
							title: value.title,
							description: value.description,
							tags: value.tagList.toString(),
							cost_price: value.cost_price,
							mrp_price: value.mrp_price,
							quantity: value.quantity,
							shipping: value.shipping,
							size: value.size,
							color: value.color,
							getCatById: value.category,
							category: value.category._id,
							getBrandById: value.brand,
							brand: value.brand._id,
							subCategories: sub.data,
							subList: value.subs,
							images: value.images,
							subs: subArr
						})
					})
			})
	};

	const onCancelUpdateHandler = () => {
		setShowUpdateModal(false);
		setSlug('');
	};

	const updateFormSubmit = (e) => {
		e.preventDefault();
		console.log(values);
		updateProduct(slug, values, user.idToken)
				.then(res => {
					toast.success(`${res.data.title} Update Successfully`);
					setShowUpdateModal(false);
					loadProducts();
				})
				.catch(err => {
					toast.success(err);

				})

	}

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const selectChange = (e, action) => {
		setValues({...values, [action.name] : e.value})
	}

	const searched = (keyword) => (search) => {
		let subs = search.subs.map(s => s.name);
		let tag = search.tagList.map(t => t);
		return  search.brand.name.toLowerCase().includes(keyword) ||
				search.title.toLowerCase().includes(keyword) ||
				search.description.toLowerCase().includes(keyword) ||
				search.category.name.toLowerCase().includes(keyword) ||
				subs.toString().toLowerCase().includes(keyword) ||
				tag.toString().toLowerCase().includes(keyword)
	}

	const productsPerPage = 5;
	const pagesVisited = pageNumber * productsPerPage;
	const pageCount = Math.ceil(products.length / productsPerPage)
	const handlePageClick = ({selected}) => {
		setPageNumber(selected)
	}

    const lists = () => (
	    <div>
		    <table className="table table-striped table-dark">
			    <thead className="text-center">
			    <tr>
				    <th>Picture</th>
				    <th>Name</th>
				    <th>Description</th>
				    <th>Stock</th>
				    <th>Cost Price</th>
				    <th>MRP Price</th>
				    <th>Brand</th>
				    <th>Color</th>
				    <th>Size</th>
				    <th>Category</th>
				    <th>Sub-Category</th>
				    <th>Tag</th>
				    <th>Action</th>
			    </tr>
			    </thead>

			    {products
					    .filter(searched(keyword))
					    .slice(pagesVisited, pagesVisited + productsPerPage)
					    .map((item,index) => (
					    <tbody key={`item-${index}`}>
						    <tr>
							    <td>
								    {item.images.length > 0 && item.images.map((img,i,arr) => {
									    if(arr[i] === arr[0]) {
										    return (
											    <Avatar
													    key={`img-${img.public_id}`}
													    shape="square"
													    size={45}
													    src={img.url}
													    icon={<UserOutlined />}
													    className="ml-2"
											    />
										    )
									    }
								    })}
							    </td>
							    <td className="text-center">{item.title}</td>
							    <td className="text-center">
													<span data-toggle="tooltip" data-placement="top" title={item.description}>
															{ item.description.length < 50 ? item.description : item.description.substring(0,50) + "..."}
													</span>
							    </td>
							    <td className="text-center">
								    {item.quantity > 0 ? <p className="text-success"> In Stock </p> : <p className="text-danger">Stock Out</p>}
							    </td>
							    <td className="text-center">{item.cost_price}</td>
							    <td className="text-center">{item.mrp_price}</td>
							    <td className="text-center">{item.brand.name}</td>
							    <td className="text-center">{item.color.toString()}</td>
							    <td className="text-center">{item.size.toString()}</td>
							    <td className="text-center">{item.category.name}</td>
							    <td className="text-center">
								    {
									    item.subs.length > 0 && item.subs.map( (s, i, arr) => {
										    if(arr.length -1 === i) {
											    let str = s.name
											    return str
										    }
										    else {
											    let str = s.name + ", "
											    return str
										    }
									    })
								    }
							    </td>
							    <td className="text-center">{item.tagList.toString()}</td>
							    <td className='text-center'>
		                                          <span
				                                          onClick={() => onOpenUpdateHandler(item.slug)}
				                                          className="btn btn-md">
		                                                <EditOutlined/>
		                                          </span>
								    <span
										    onClick={() => onOpenDeleteHandler(item.slug)}
										    className="btn btn-md">
	                                                      <DeleteOutlined/>
	                                              </span>
							    </td>

						    </tr>

					    </tbody>
			    ))}
		    </table>
	    </div>
    )

	return (
			<React.Fragment>
				<Modal
						show={showDeleteModal}
						onCancel={onCancelDeleteHandler}
						header="Are You Sure ?"
						footerClass="place-item__modal-actions"
						footer={
							<React.Fragment>
								<button className="btn btn-danger float-right mb-2 ml-2" onClick={onConfirmDeleteHandler}>Delete</button>
								<button className="btn btn-primary float-right mb-2 ml-2" onClick={onCancelDeleteHandler}>Cancel</button>
							</React.Fragment>
						}>
					<div>
						<p>Would You want to Delete ?</p>
					</div>
				</Modal>

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
												rows = "2"
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
												options={ship.map( s => ({
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
												options={sizes.map( s => ({
															"value": s,
															"label": s,
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
									<label className=" col-form-label font-weight-bold text-center"> Category </label>
									<div>
										<Select
												name="category"
												placeholder="Select Category"
												value={{value: getCatById._id || "", label: category.name || getCatById.name}}
												options={categories.map( c => ({
															"value" : c._id,
															"label" : c.name
														})
												)}
												onChange={e => {
													getSubCategories(e.value)
															.then(res => {
																setValues({...values, getCatById: { value : e.value, name: e.label }, category: e.value, subCategories: res.data, subList: [], subs: []})
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
														"value" : sub._id || sub.value,
														"label" : sub.name || sub.label
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
													if(Array.isArray(e)) {
														e.map(x => {
															arr.push(x.value)
															subArr.push(x)
														})
													} else {
														return []
													}
														setValues({...values, subList: subArr, subs : arr})
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
												options={brands.map( b => ({
															"value" : b._id,
															"label" : b.name,
														})
												)}
												onChange={e => {
													setValues({...values, brand: e.value, getBrandById: { value : e.value, name: e.label }})
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

				<div className="container-fluid">
					<div className="row">
						<div className="col-md-1">
							<div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
								<AdminNav/>
							</div>
						</div>
						<div className="col-md-11 adjustment">
							<LocalSearch keyword={keyword} setKeyword={setKeyword}/>
							{lists()}
							<ReactPaginate
								previousLabel={"Previous"}
								nextLabel={"Next"}
								pageCount={pageCount}
								onPageChange={handlePageClick}
								containerClassName={"paginationBtns"}
								previousLinkClassName={"previousBtn"}
								nextLinkClassName={"nextBtn"}
								disabledClassName={"paginationDisabled"}
								activeClassName={"paginationActive"}
							/>
						</div>
					</div>
				</div>
			</React.Fragment>

	)

}

export default ListProducts;