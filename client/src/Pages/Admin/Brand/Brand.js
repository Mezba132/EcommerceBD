import React, {useEffect, useState} from "react";
import {Layout, Spin} from "antd";
import CreateBrand from "../../../Components/Shared/Form/Admin/CreateBrand";
import {
	createBrand,
	removeBrand,
	updateBrand
} from '../../../Functions/Brand'
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {toast} from "react-toastify";
import ReactPaginate from 'react-paginate'
import {useDispatch, useSelector} from "react-redux";
import Delete from "../../../Components/Shared/Modal/Delete";
import UpdateBrand from "../../../Components/Shared/Modal/Admin/BrandUpdate";
import BrandList from "../../../Components/Shared/ListPages/Admin/ListBrand";
import { FetchBrands, FetchBrand } from "../../../Redux/Actions";
import {CREATE_BRAND, DELETE_BRAND, UPDATE_BRAND} from "../../../Redux/Constants";
const {Content} = Layout
import HeaderAdmin from "../../../Components/Layout/Admin/Header";
import SideBar from "../../../Components/Layout/Admin/Sidebar";
import FooterAdmin from "../../../Components/Layout/Admin/Footer";

const Brand = () => {

	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [slug, setSlug] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [updateName, setUpdateName] = useState('')
	const [keyword, setKeyword] = useState('')
	const [pageNumber, setPageNumber] = useState(0)

	const dispatch = useDispatch()
	const { user, brand } = useSelector(state => state)
	const brands = brand.getBrands
	const singleBrand = brand.getBrand

	useEffect(() => {
		dispatch(FetchBrands())
		setUpdateName(singleBrand.name)
	},[dispatch, singleBrand])

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createBrand(user,{ name } , user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`${res.data.name} - Brand Inserted Successfully`);
				dispatch({
					type : CREATE_BRAND,
					payload : res.data
				})
				dispatch(FetchBrands())
			})
			.catch(err => {
				setLoading(false);
				setName('')
				toast.error(`${name} - Brand Inserts Failed`);
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
		removeBrand(user, slug, user.token)
				.then(res => {
					setShowDeleteModal(false);
					toast.success(`${res.data.name} - Brand deleted Successfully`)
					dispatch({
						type : DELETE_BRAND,
						payload : res.data
					})
					dispatch(FetchBrands())
				})
				.catch(err => {
					toast.error( "deleted Failed")
				})
	}

	const onOpenUpdateHandler = (slug) => {
		setShowUpdateModal(true);
		setSlug(slug);
		dispatch(FetchBrand(slug))
	};

	const onCancelUpdateHandler = () => {
		setShowUpdateModal(false);
		setSlug('');
	};

	const updateSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateBrand(user, slug,{ updateName } , user.token)
				.then((res) => {
					setLoading(false);
					setUpdateName('')
					toast.success(`${updateName} Update Successfully`);
					setShowUpdateModal(false);
					setSlug('');
					dispatch({
						type : UPDATE_BRAND,
						payload : res.data
					})
					dispatch(FetchBrands())
				})
				.catch(err => {
					setLoading(false);
					setUpdateName('')
					toast.error(`${updateName} Updated Failed`);
					setShowUpdateModal(false);
					setSlug('');
				})
	}

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

	const brandsPerPage = 5;
	const pagesVisited = pageNumber * brandsPerPage;
	const pageCount = Math.ceil(brands.length / brandsPerPage)
	const handlePageClick = ({selected}) => {
		setPageNumber(selected)
	}

	return (
		<React.Fragment>

			<Delete
					showDeleteModal={showDeleteModal}
					onCancelDeleteHandler={onCancelDeleteHandler}
					onConfirmDeleteHandler={onConfirmDeleteHandler}
			/>

			<UpdateBrand
					showUpdateModal={showUpdateModal}
					onCancelUpdateHandler={onCancelUpdateHandler}
					updateName={updateName}
					setUpdateName={setUpdateName}
					loading={loading}
					updateSubmit={updateSubmit}
			/>

			<Layout>
				<HeaderAdmin/>
				<SideBar/>
				<Layout className='content-layout'>
					<Content className="site-layout-background content">
						{loading ? <div className="text-center"> <Spin tip="Loading..." /> </div> :
							<CreateBrand
								handleSubmit={handleSubmit}
								name={name}
								setName={setName}
								loading={loading}
							/>
						}
						<LocalSearch keyword={keyword} setKeyword={setKeyword}/>
						{brands.length > 0 ?
							<div className="mt-3">
								<BrandList
										brands={brands}
										searched={searched}
										keyword={keyword}
										onOpenUpdateHandler={onOpenUpdateHandler}
										onOpenDeleteHandler={onOpenDeleteHandler}
										pagesVisited={pagesVisited}
										brandsPerPage={brandsPerPage}
								/>
							</div> :
							<div className="text-center mt-5">
								<h1>No Brand Found</h1>
							</div>

						}
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
					</Content>
					<FooterAdmin/>
				</Layout>
			</Layout>
		</React.Fragment>
	)
}

export default Brand;