import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import { getProductsByFilters, removeProduct, getProduct, updateProduct } from "../../../Functions/Product";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
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
import { FetchProducts, FetchProduct } from '../../../Redux/Actions'
import {DELETE_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT} from "../../../Redux/Constants";
import {Layout} from "antd";
const {Content} = Layout
import HeaderAdmin from "../../../Components/Layout/Admin/Header";
import SideBar from "../../../Components/Layout/Admin/Sidebar";
import FooterAdmin from "../../../Components/Layout/Admin/Footer";

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
			stock: '',
			createdDate:[]
		}
	})

	const dispatch = useDispatch()
	const { user, product } = useSelector(state => state)
	const products = product.getProducts;


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
		let isMounted = true
		if(isMounted) {
			loadProducts(filteredData.filters);
		}
		// cleanup
		return () => { isMounted = false }
	},[dispatch])

	const loadProducts = (currentFilters) => {
		dispatch(FetchProducts(currentFilters))
	}

	const LoadSingleProduct = (slug) => {
		getProduct(slug)
				.then(res => {
					let value = res.data;
					dispatch({
						type : FETCH_PRODUCT,
						payload : res.data
					})
					getSubCategories(value.category._id)
							.then(sub =>
							{
								let subArr = [];
								value.subs.map(s => {
									subArr.push(s._id)
								})
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

	const onOpenDeleteHandler = (slug) => {
		setShowDeleteModal(true);
		setSlug(slug);
	}

	const onCancelDeleteHandler = () => {
		setShowDeleteModal(false);
		setSlug('');
	}

	const onConfirmDeleteHandler = () => {
		removeProduct(user, slug, user.token)
				.then(res => {
					setShowDeleteModal(false);
					toast.success(`${res.data.title} deleted Successfully`);
					dispatch({
						type : DELETE_PRODUCT,
						payload : res.data
					})
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
	}

	const onCancelUpdateHandler = () => {
		setShowUpdateModal(false);
		setSlug('');
	}

	const updateFormSubmit = (e) => {
		e.preventDefault();
		updateProduct(user, slug, values, user.token)
				.then(res => {
					toast.success(`${res.data.title} Update Successfully`);
					dispatch({
						type : UPDATE_PRODUCT,
						payload : res.data
					})
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
		console.log(values)
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

				<Layout>
					<HeaderAdmin/>
					<SideBar/>
					<Layout className='content-layout'>
						<Content className="site-layout-background content">
							<div className="jumbotron">
								<ListFilter
										filteredData={filteredData}
										setFilteredData={setFilteredData}
										loadProducts={loadProducts}
										subCategories={subCategories}
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
						</Content>
						<FooterAdmin/>
					</Layout>
				</Layout>
			</React.Fragment>
	)
}

export default ListProducts;