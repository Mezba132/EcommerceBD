import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import {
	createSubCategory,
	getSubCategories,
	removeSubCategory,
	updateSubCategory,
	getSubCategory
} from '../../../Functions/SubCategory'
import {
	getCategories
} from '../../../Functions/Categoy'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import CreateSub from "../../../Components/Shared/Form/Admin/CreateSub";
import ReactPaginate from 'react-paginate'
import Delete from "../../../Components/Shared/Modal/Delete";
import SubUpdate from "../../../Components/Shared/Modal/Admin/SubCategoryUpdate";
import SubList from "../../../Components/Shared/ListPages/Admin/ListSub";

const SubCategory = () => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [slug, setSlug] = useState('')
	const [updateName, setUpdateName] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [catName, setCatName] = useState('')
	const [parentId, setParentId] = useState(null)
	const [parentName, setParentName] = useState('')
	const [pageNumber, setPageNumber] = useState(0)

	const { user }  = useSelector(user => user);

	useEffect(() => {
		loadCategories();
		loadSubCategories();
	}, [])

	const loadCategories = () => {
		getCategories()
			.then((res) => {
				setCategories(res.data);
			})
	};

	const loadSubCategories = () => {
		getSubCategories()
				.then((res) => {
					setSubCategories(res.data)
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
		removeSubCategory(slug, user.idToken)
				.then(res => {
					setShowDeleteModal(false);
					toast.success(`${res.data.name} deleted Successfully`)
					loadSubCategories();
				})
				.catch(err => {
					toast.error( "deleted Failed")
				})
	}

	const onOpenUpdateHandler = (slug) => {
		setShowUpdateModal(true);
		setSlug(slug);
		getSubCategory(slug)
				.then(res => {
					setParentId(res.data.parent)
					setParentName(res.data.cname)
					setUpdateName(res.data.name)
				})
	};

	const onCancelUpdateHandler = () => {
		setShowUpdateModal(false);
		setSlug('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createSubCategory({ name, parent : category, cname : catName } , user.idToken)
			.then(() => {
				setLoading(false);
				setName('')
				toast.success(`${name} inserted Successfully`);
				setCategory('')
				loadSubCategories();
			})
			.catch(err => {
				console.log(err)
				setLoading(false);
				setName('')
				toast.error(`${name} insert Failed`);
			})
	}

	const updateFormSubmit = (e) => {
		e.preventDefault();
		setLoading(true)
		updateSubCategory(slug,{ name : updateName, parent : parentId, cname : parentName } , user.idToken)
			.then(() => {
				setLoading(false);
				setUpdateName('')
				toast.success(`${updateName} Update Successfully`);
				setShowUpdateModal(false);
				setSlug('');
				loadSubCategories()
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

			<div className="container-fluid">
				<div className="row">
					<div className="col-md-1">
						<div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
							<AdminNav/>
						</div>
					</div>
					<div className="col-md-11 adjustment">
						{loading ?
							<div className="text-center"> <Spin tip="Loading..." /> </div>
							:
							<CreateSub
								handleSubmit={handleSubmit}
								name={name} setName={setName}
								loading={loading} categories={categories}
								setCategory={setCategory}
								setCatName={setCatName}/>
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
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default SubCategory;