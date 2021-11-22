import React from "react";
import Modal from '../index'
import Select from "react-select";

const SubUpdate = (
			{
				showUpdateModal,
				onCancelUpdateHandler,
				updateName,
				setUpdateName,
				loading,
				updateFormSubmit,
				parentId,
				parentName,
				categories,
				setParentId,
				setParentName
			}
		) => (
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
								isClearable

								value={{value: parentId, label:parentName}}
								options={categories.map( c => ({
											"value" : c._id,
											"label" : c.name
										})
								)}

								onChange={e => {

									if(e === null) {
										setParentId("")
										setParentName("")
									}
									else {
										setParentId(e.value)
										setParentName(e.label)
									}
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
)

export default SubUpdate;