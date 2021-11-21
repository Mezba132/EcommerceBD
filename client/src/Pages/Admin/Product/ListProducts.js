import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import { getProductsByFilters, removeProduct, getProduct, updateProduct } from "../../../Functions/Product";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

import {
	getCategories,
	getSubCategories
} from '../../../Functions/Categoy'
import { getBrands } from '../../../Functions/Brand'
import ReactPaginate from 'react-paginate'
import ListProduct from "../../../Components/Shared/ListPages/Admin/ListProduct";
import ListFilter from "../../../Components/Shared/Filters/Admin/ProductsFilter";
import Delete from "../../../Components/Shared/Modal/Delete";
import ProductUpdate from "../../../Components/Shared/Modal/Admin/ProductUpdate";
import ShowProduct from "../../../Components/Shared/Modal/Admin/ProductShow";

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
	tags:'',
}

const ListProducts = () => {

	const [products, setProducts] = useState([])
	const [keyword, setKeyword] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showProductModal, setShowProductModal] = useState(false);
	const [slug, setSlug] = useState('');
	const [values, setValues] = useState(initialState);
	const [pageNumber, setPageNumber] = useState(0);
	const [filteredData, setFilteredData] = useState({
		filters: {
			title: '',
			category: '',
			subs:[],
			color:[],
			brand:'',
			quantity: ''
		}
	})

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

	const stockOption = [
			{
				value : "InStock",
				label: 'In Stock'
			},
			{
				value : "StockOut",
				label : 'Out of Stock'
			}
		]

	useEffect(() => {
		loadProducts(filteredData.filters);
		loadFields();
	},[])

	const loadProducts = (currentFilters) => {
		getProductsByFilters(currentFilters)
				.then(res => {
					setProducts(res.data);
				})
				.catch(err => {
					console.log(err);
				})
	}

	const LoadSingleProduct = (slug) => {
		getProduct(slug)
				.then(res => {
					let value = res.data;
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
									categoryName: value.category.name,
									getBrandById: value.brand,
									brand: value.brand._id,
									brandName: value.brand.name,
									subCategories: sub.data,
									subList: value.subs,
									images: value.images,
									subs: subArr
								})
							})
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
		LoadSingleProduct(slug);
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

	const onOpenProductHandler = (slug) => {
		setShowProductModal(true);
		setSlug(slug)
		LoadSingleProduct(slug);
	}

	const onCancelProductHandler = (slug) => {
		setShowProductModal(false);
		setSlug('')
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
		setPageNumber(selected);
	}


	return (
			<React.Fragment>

				<Delete
						showDeleteModal={showDeleteModal}
						onCancelDeleteHandler={onCancelDeleteHandler}
						onConfirmDeleteHandler={onConfirmDeleteHandler}
				/>

				<ProductUpdate
						values={values}
						setValues={setValues}
						showUpdateModal={showUpdateModal}
						onCancelUpdateHandler={onCancelUpdateHandler}
						handleChange={handleChange}
						selectChange={selectChange}
						updateFormSubmit={updateFormSubmit}
				/>

				<ShowProduct
						values={values}
						setValues={setValues}
						onCancelProductHandler={onCancelProductHandler}
						showProductModal={showProductModal}
				/>

				<div className="container-fluid">
					<div className="row">
						<div className="col-md-1">
							<div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
								<AdminNav/>
							</div>
						</div>
						<div className="col-md-11 adjustment">
							<div className="jumbotron">
								<ListFilter
										filteredData={filteredData}
										categories={categories}
										setFilteredData={setFilteredData}
										loadProducts={loadProducts}
										subCategories={subCategories}
										brands={brands}
										colors={colors}
										stockOption={stockOption}
										values={values}
										setValues={setValues}
								/>
							</div>
							<LocalSearch keyword={keyword} setKeyword={setKeyword}/>
							<ListProduct
								products={products}
								searched={searched}
								keyword={keyword}
								pagesVisited={pagesVisited}
								productsPerPage={productsPerPage}
								onOpenUpdateHandler={onOpenUpdateHandler}
								onOpenDeleteHandler={onOpenDeleteHandler}
								onOpenProductHandler={onOpenProductHandler}
							/>
							{products.length > 0 &&
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
							}
						</div>
					</div>
				</div>
			</React.Fragment>
	)
}

export default ListProducts;