import React from "react";
import Modal from '../index'

const UpdateBrand = (
			{
				showUpdateModal,
				onCancelUpdateHandler,
				updateName,
				setUpdateName,
				loading,
				updateSubmit
			}
		) => (
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
)

export default UpdateBrand;