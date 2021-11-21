import React from "react";
import Modal from '../index'
import ShowImage from "../../ShowImage";

const ShowProduct = (
			{
				values,
				onCancelProductHandler,
				showProductModal
			}
		) => {

	const text = () => {
				let arr = []
				for (let i in values.description) {
					arr.push(values.description[i]);
				}

				return arr.map(s => {
					if (s === '\n') {
						return <br/>
					}
					else {
						return s
					}
				})
	}

	return (
		<Modal
				show={showProductModal}
				onCancel={onCancelProductHandler}
				header={`${values.title}`}
				modal_body={"pro_height"}
				children={
					<div>
						<table>
							<tbody>
								<tr >
									<td className="col-sm-4 font align-text-top">Pictures : </td>
									<td className="col-sm-20">
										<ShowImage
												values={values}
										/>
									</td>
								</tr>
								<tr >
									<td className="col-sm-4 font align-text-top">Title : </td>
									<td className="col-sm-20 font font-weight-bold">{values.title}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Description : </td>
									<td className="font font-weight-bold">{text()}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Tag : </td>
									<td className="font font-weight-bold">{values.tags}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Cost Price  : </td>
									<td className="font font-weight-bold">{`Tk-${values.cost_price}`}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">MRP Price  : </td>
									<td className="font font-weight-bold">{`Tk-${values.mrp_price}`}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Quantity  : </td>
									<td className="font font-weight-bold">{values.quantity}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Shipping  : </td>
									<td className="font font-weight-bold">{values.shipping}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Size  : </td>
									<td className="font font-weight-bold">{values.size.toString()}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Color  : </td>
									<td className="font font-weight-bold">{values.color.toString()}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Category  : </td>
									<td className="font font-weight-bold">{values.categoryName}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Sub-Category  : </td>
									<td className="font font-weight-bold">
										{values.subList.map( (s, i, arr) => {
											if(arr.length -1 === i) {
												let str = s.name
												return str
											}
											else {
												let str = s.name + ", "
												return str
												}
											})
										}
									</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Brand  : </td>
									<td className="font font-weight-bold">{values.brandName}</td>
								</tr>
							</tbody>
						</table>
					</div>

				}
				footer={
					<React.Fragment>
						<span
								className="btn btn-warning float-right ant-btn-lg mr-3"
								onClick={onCancelProductHandler}> Back
                              </span>
					</React.Fragment>
				}
				footerClass="mb-5"
		/>
	)
}

export default ShowProduct;