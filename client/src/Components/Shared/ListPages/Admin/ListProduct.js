import React from "react";
import {Avatar} from "antd";
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import parse from 'html-react-parser'


const ListProduct = (
		{
			products,
			searched,
			keyword,
			pagesVisited,
			productsPerPage,
			onOpenUpdateHandler,
			onOpenDeleteHandler,
			onOpenProductHandler
		}) => {

	return (
		<div>
			<table className="table table-striped table-dark">
				<thead className="text-center">
				<tr>
					<th>Picture</th>
					<th>Name</th>
					<th>Description</th>
					<th>Stock</th>
					<th>Cost Price</th>
					<th>MRP Price</th>
					<th>Brand</th>
					<th>Color</th>
					<th>Size</th>
					<th>Category</th>
					<th>Sub-Category</th>
					<th>Tag</th>
					<th>Action</th>
				</tr>
				</thead>
				{products
						.filter(searched(keyword))
						.slice(pagesVisited, pagesVisited + productsPerPage)
						.map((item,index) => (
								<tbody key={`item-${index}`}>
								<tr>

									<td>
										{item.images.length > 0 && item.images.map((img,i,arr) => {
											if(arr[i] === arr[0]) {
												return (
														<Avatar
																key={`img-${img.public_id}`}
																shape="square"
																size={45}
																src={img.url}
																icon={<UserOutlined />}
																className="ml-2"
														/>
												)
											}
										})}
									</td>
									<td className="text-center">
										<span className="pointer"
												onClick={ () => onOpenProductHandler(item.slug)}>
											{item.title}
										</span>
									</td>
									<td className="text-center">
											{/*{  parse(item.description.substring(0,50))}*/}
											<span data-toggle="tooltip" data-placement="top" title={item.description}>
													{ item.description.length < 50 ? parse(item.description) : parse(item.description.substring(0,50) + "...") }
											</span>

									</td>
									<td className="text-center">
										{item.quantity > 0 ? <p className="text-success"> In Stock </p> : <p className="text-danger">Stock Out</p>}
									</td>
									<td className="text-center">{item.cost_price}</td>
									<td className="text-center">{item.mrp_price}</td>
									<td className="text-center">{item.brand.name}</td>
									<td className="text-center">{item.color.toString()}</td>
									<td className="text-center">{item.size.toString()}</td>
									<td className="text-center">{item.category.name}</td>
									<td className="text-center">
										{
											item.subs.length > 0 && item.subs.map( (s, i, arr) => {
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
									<td className="text-center">{item.tagList.toString()}</td>
									<td className='text-center'>
                                      <span
		                                      onClick={() => onOpenUpdateHandler(item.slug)}
		                                      className="btn btn-md">
                                            <EditOutlined/>
                                      </span>
										<span
												onClick={() => onOpenDeleteHandler(item.slug)}
												className="btn btn-md">
		                                                      <DeleteOutlined/>
								        </span>
									</td>
								</tr>

								</tbody>
						))}
			</table>
		</div>
)}

export default ListProduct;