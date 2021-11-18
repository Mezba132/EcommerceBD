import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import Select from 'react-select';
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
import {
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import Modal from "../../../Components/Shared/Modal";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import CreateSubForm from "../../../Components/Shared/Form/CreateSubForm";

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
					header="Update Sub Category"
					children={
							<div className="form-group">
								<p className="font-weight-bold">Update SubCategory</p>
								<input
										name=""
										placeholder="Update Sub-Category"
										className="form-control mb-2"
										type="text"
										onChange={e => setUpdateName(e.target.value)}
										autoFocus
										value={updateName}
										disabled={loading}
								/>
								<p className="font-weight-bold">Update Category</p>
								<Select
										// value={categories.map( c =>
										// 			c._id === parentId ?
										// 				{
										// 					"value" : parentId,
										// 					"label" : parentName
										// 				} : null
										// )}
										value={{value: parentId, label:parentName}}
										options={categories.map( c => ({
													"value" : c._id,
													"label" : c.name
												})
										)}

										onChange={e => {
											setParentId(e.value)
											setParentName(e.label)
										}}
								/>
							</div>
					}
					footer={
						<React.Fragment>
							<button
									type="submit"
									className="btn btn-primary float-right ant-btn-lg"
									disabled={!updateName || updateName.length < 2 || loading}> Update
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
						{loading ?
							<div className="text-center"> <Spin tip="Loading..." /> </div>
							:
							<CreateSubForm
								handleSubmit={handleSubmit}
								name={name} setName={setName}
								loading={loading} categories={categories}
								setCategory={setCategory}
								setCatName={setCatName}/>
						}
						<LocalSearch keyword={keyword} setKeyword={setKeyword}/>
						{subCategories.length > 0 ?
							<div className="mt-3">
								<table className="table table-striped table-dark">
									<thead className="text-center">
									<tr>
										<th>Sub-Category Name</th>
										<th>Category Name</th>
										<th>Action</th>
									</tr>
									</thead>
									{subCategories.filter(searched(keyword)).map( s =>
										<tbody key={s._id}>
											<tr>
												<td className='text-center'>{s.name}</td>
												<td className='text-center'>{s.cname}</td>
												<td className='text-center'>
													<span
				                                          onClick={() => onOpenUpdateHandler(s.slug)}
				                                          className="btn btn-md">
				                                        <EditOutlined/>
													</span>
													<span
															onClick={() => onOpenDeleteHandler(s.slug)}
															className="btn btn-md">
				                                              <DeleteOutlined/>
				                                    </span>
												</td>
											</tr>
										</tbody>
									)}
								</table>
							</div> :
							<div className="text-center mt-5">
								<h1>No Sub-Category Found</h1>
							</div>
						}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default SubCategory;