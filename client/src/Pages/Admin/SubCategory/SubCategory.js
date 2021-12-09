import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Layout, Spin} from "antd";
import {
	createSubCategory,
	removeSubCategory,
	updateSubCategory,
} from '../../../Functions/SubCategory'
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import CreateSub from "../../../Components/Shared/Form/Admin/CreateSub";
import ReactPaginate from 'react-paginate'
import Delete from "../../../Components/Shared/Modal/Delete";
import SubUpdate from "../../../Components/Shared/Modal/Admin/SubCategoryUpdate";
import SubList from "../../../Components/Shared/ListPages/Admin/ListSub";
import { FetchCategories, FetchSubCategories, FetchSubCategory } from '../../../Redux/Actions'
import {CREATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, UPDATE_SUB_CATEGORY} from "../../../Redux/Constants";
const {Content} = Layout
import HeaderAdmin from "../../../Components/Layout/Admin/Header";
import SideBar from "../../../Components/Layout/Admin/Sidebar";
import FooterAdmin from "../../../Components/Layout/Admin/Footer";

const SubCategory = () => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [slug, setSlug] = useState('')
	const [updateName, setUpdateName] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [catName, setCatName] = useState('');
	const [parentId, setParentId] = useState(null)
	const [parentName, setParentName] = useState('')
	const [pageNumber, setPageNumber] = useState(0)

	const dispatch = useDispatch()
	const { user, category, subs }  = useSelector(user => user);
	const categories = category.getCategories
	const subCategories = subs.getSubCategories
	const sub = subs.getSubCategory

	useEffect(() => {
		dispatch(FetchCategories())
		dispatch(FetchSubCategories())
		setParentId(sub.parent)
		setParentName(sub.cname)
		setUpdateName(sub.name)
	}, [dispatch, sub])

	const onOpenDeleteHandler = (slug) => {
		setShowDeleteModal(true);
		setSlug(slug);
	};

	const onCancelDeleteHandler = () => {
		setShowDeleteModal(false);
		setSlug('');
	};

	const onConfirmDeleteHandler = () => {
		removeSubCategory(user, slug, user.token)
				.then(res => {
					setShowDeleteModal(false);
					toast.success(`${res.data.name} deleted Successfully`)
					dispatch({
						type : DELETE_SUB_CATEGORY,
						payload : res.data
					})
					dispatch(FetchSubCategories())
				})
				.catch(err => {
					toast.error( "deleted Failed")
				})
	}

	const onOpenUpdateHandler = (slug) => {
		setShowUpdateModal(true);
		setSlug(slug);
		dispatch(FetchSubCategory(slug))
	};

	const onCancelUpdateHandler = () => {
		setShowUpdateModal(false);
		setSlug('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createSubCategory(user,{ name, parent : categoryId, cname : catName } , user.token)
			.then((res) => {
				setLoading(false);
				setName('')
				toast.success(`${name} inserted Successfully`);
				setCategoryId('')
				dispatch({
					type: CREATE_SUB_CATEGORY,
					payload : res.data
				})
				dispatch(FetchSubCategories())
			})
			.catch(err => {
				console.log(err)
				setLoading(false);
				setName('')
				setCategoryId('')
				toast.error(`${name} Insert Failed`);
			})
	}

	const updateFormSubmit = (e) => {
		e.preventDefault();
		setLoading(true)
		updateSubCategory(user, slug,{ name : updateName, parent : parentId, cname : parentName } , user.token)
			.then((res) => {
				setLoading(false);
				setUpdateName('')
				toast.success(`${updateName} Update Successfully`);
				setShowUpdateModal(false);
				setSlug('');
				dispatch({
					type : UPDATE_SUB_CATEGORY,
					payload : res.data
				})
				dispatch(FetchSubCategories())
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

	const subCatsPerPage = 5;
	const pagesVisited = pageNumber * subCatsPerPage;
	const pageCount = Math.ceil(subCategories.length / subCatsPerPage)
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

			<SubUpdate
					showUpdateModal={showUpdateModal}
					onCancelUpdateHandler={onCancelUpdateHandler}
					updateName={updateName}
					setUpdateName={setUpdateName}
					loading={loading}
					updateFormSubmit={updateFormSubmit}
					parentId={parentId}
					parentName={parentName}
					categories={categories}
					setParentId={setParentId}
					setParentName={setParentName}
			/>

			<Layout>
				<HeaderAdmin/>
				<SideBar/>
				<Layout
						style={{
							marginTop : '80px',
							marginLeft: '200px',
							padding: '0 24px 24px',
							width : '100%'
						}}>
					<Content
							className="site-layout-background"
							style={{
								width : '80rem',
								padding: 24,
								margin: 0,
								minHeight: 300,
							}}
					>
						{loading ?
							<div className="text-center"> <Spin tip="Loading..." /> </div>
							:
							<CreateSub
								handleSubmit={handleSubmit}
								name={name}
								setName={setName}
								loading={loading}
								categories={categories}
								setCategory={setCategoryId}
								setCatName={setCatName}
								category={category}
							/>
						}
						<LocalSearch keyword={keyword} setKeyword={setKeyword}/>
						{subCategories.length > 0 ?
							<div className="mt-3">
								<SubList
										subCategories={subCategories}
										searched={searched}
										keyword={keyword}
										pagesVisited={pagesVisited}
										subCatsPerPage={subCatsPerPage}
										onOpenUpdateHandler={onOpenUpdateHandler}
										onOpenDeleteHandler={onOpenDeleteHandler}
								/>
							</div> :
							<div className="text-center mt-5">
								<h1>No Sub-Category Found</h1>
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

export default SubCategory;