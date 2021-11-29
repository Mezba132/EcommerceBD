import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import CreateBrand from "../../../Components/Shared/Form/Admin/CreateBrand";
import {
	getBrands,
	createBrand,
	removeBrand,
	getBrand,
	updateBrand
} from '../../../Functions/Brand'
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {toast} from "react-toastify";
import ReactPaginate from 'react-paginate'
import {useSelector} from "react-redux";
import Delete from "../../../Components/Shared/Modal/Delete";
import UpdateBrand from "../../../Components/Shared/Modal/Admin/BrandUpdate";
import BrandList from "../../../Components/Shared/ListPages/Admin/ListBrand";

const Brand = () => {

	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [slug, setSlug] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [updateName, setUpdateName] = useState('')
	const [brands, setBrands] = useState([])
	const [keyword, setKeyword] = useState('')
	const [pageNumber, setPageNumber] = useState(0)

	const { user } = useSelector(user => user)

	useEffect(() => {
		loadBrands()
	},[])

	const loadBrands = () => {
		setLoading(true);
		getBrands()
				.then(res => {
					setLoading(false)
					setBrands(res.data)
				})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createBrand(user,{ name } , user.token)
			.then(() => {
				setLoading(false);
				setName('');
				loadBrands();
				toast.success(`${name} - Brand inserted Successfully`);
			})
			.catch(err => {
				console.log(err)
				setLoading(false);
				setName('')
				toast.error(`${name} - Brand inserts Failed`);
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
					loadBrands();
				})
				.catch(err => {
					toast.error( "deleted Failed")
				})
	}

	const onOpenUpdateHandler = (slug) => {
		setShowUpdateModal(true);
		setSlug(slug);
		getBrand(slug)
				.then(res => {
					setUpdateName(res.data.name)
				})
	};

	const onCancelUpdateHandler = () => {
		setShowUpdateModal(false);
		setSlug('');
	};

	const updateSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateBrand(user, slug,{ updateName } , user.token)
				.then(() => {
					setLoading(false);
					setUpdateName('')
					toast.success(`${updateName} Update Successfully`);
					setShowUpdateModal(false);
					setSlug('');
					loadBrands()
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

			<div className="container-fluid">
				<div className="row">
					<div className="sticky-sidebar">
						<AdminNav/>
					</div>
					<div className="adjustment">
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
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Brand;