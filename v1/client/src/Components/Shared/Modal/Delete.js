import React from "react";
import Modal from './index'

const Delete = (props) => {

	return (
		<Modal
				show={props.showDeleteModal}
				onCancel={props.onCancelDeleteHandler}
				header="Are You Sure ?"
				footerClass="place-item__modal-actions"
				footer={
					<React.Fragment>
						<button className="btn btn-danger float-right mb-2 ml-2" onClick={props.onConfirmDeleteHandler}>Delete</button>
						<button className="btn btn-primary float-right mb-2 ml-2" onClick={props.onCancelDeleteHandler}>Cancel</button>
					</React.Fragment>
				}>
			<div>
				<p>Would You want to Delete ?</p>
			</div>
		</Modal>
	)
}

export default Delete;