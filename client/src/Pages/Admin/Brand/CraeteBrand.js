import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import Modal from "../../../Components/Shared/Modal";
import {Spin} from "antd";
import CreateBrand from "../../../Components/Shared/Form/CreateBrand";
import {
	getBrands,
	createBrand,
	removeBrand,
	getBrand,
	updateBrand
} from '../../../Functions/Brand'
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const Brand = () => {

	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [slug, setSlug] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [updateName, setUpdateName] = useState('')
	const [brands, setBrands] = useState([])
	const [keyword, setKeyword] = useState('')

	const { user } = useSelector(user => user)

	useEffect(() => {
		loadBrands()
	},[])

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createBrand({ name } , user.idToken)
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

	const loadBrands = () => {
		setLoading(true);
		getBrands()
			.then(res => {
				setLoading(false)
				setBrands(res.data)
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
		removeBrand(slug, user.idToken)
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
		updateBrand(slug,{ updateName } , user.idToken)
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
					header="Update Category"
					children={
						<div>
							<p className="font-weight-bold">Update Brand</p>
							<div className="form-group">
								<input
										name=""
										placeholder="Add New Category"
										className="form-control"
										type="text"
										onChange={e => setUpdateName(e.target.value)}
										autoFocus
										value={updateName}
										disabled={loading}
								/>
							</div>
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
					onSubmit={updateSubmit}
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
								<table className="table table-striped table-dark">
									<thead className="text-center">
										<tr>
											<th>Brand Name</th>
											<th>Action</th>
										</tr>
									</thead>
									{brands.filter(searched(keyword)).map( b =>
										<tbody key={b._id}>
											<tr>
												<td className='text-center'>{b.name}</td>
												<td className='text-center'>
				                                        <span
						                                        onClick={() => onOpenUpdateHandler(b.slug)}
						                                        className="btn btn-md">
                                                                    <EditOutlined/>
			                                            </span>
														<span
																onClick={() => onOpenDeleteHandler(b.slug)}
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
								<h1>No Brand Found</h1>
							</div>

						}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Brand;