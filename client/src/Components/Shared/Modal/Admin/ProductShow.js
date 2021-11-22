import React from "react";
import Modal from '../index'
import ShowImage from "../../ShowImage";
import parse from 'html-react-parser'

const ShowProduct = (
			{
				values,
				onCancelProductHandler,
				showProductModal
			}
		) => {

	return (
		<Modal
				show={showProductModal}
				onCancel={onCancelProductHandler}
				header={`${values.title}`}
				modal_body={"single_product"}
				children={
					<div>
						<table>
							<tbody>
								<tr >
									<td className="font align-text-top">Pictures : </td>
									<td>
										<ShowImage
												values={values}
										/>
									</td>
								</tr>
								<tr >
									<td className="col-sm-4 font align-text-top">Title : </td>
									<td className="font font-weight-bold">{values.title}</td>
								</tr>
								<tr>
									<td className="col-sm-4 font align-text-top">Description : </td>
									<td className="font">{parse(values.description)}</td>
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