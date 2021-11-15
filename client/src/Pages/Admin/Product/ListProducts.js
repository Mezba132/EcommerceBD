import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import { getProducts } from "../../../Functions/Product";
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import LocalSearch from "../../../Components/Shared/LocalSearch";
import {Avatar} from "antd";

const ListProducts = () => {

	const [products, setProducts] = useState([])
	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		loadProducts();
		console.log(products)
	},[])

	const loadProducts = () => {
		getProducts()
				.then(res => {
					setProducts(res.data);
				})
				.catch(err => {
					console.log(err);
				})
	}

	const searched = (keyword) => (c) => {
		return  c.brand.name.toLowerCase().includes(keyword) ||
				c.title.toLowerCase().includes(keyword) ||
				c.category.name.toLowerCase().includes(keyword)
	}

	return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-1">
						<div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
							<AdminNav/>
						</div>
					</div>
					<div className="col-md-11 adjustment">
						<LocalSearch keyword={keyword} setKeyword={setKeyword}/>
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
										<th>Category</th>
										<th>Sub-Category</th>
										<th>Tag</th>
										<th>Action</th>
									</tr>
								</thead>

								{products.filter(searched(keyword)).map(item => (
									<tbody>
										<tr>
											<td>
												{item.images.length > 0 && item.images.map((img,i,arr) => {
													if(arr[i] === arr[0]) {
														return (
															<Avatar
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
											<td className="text-center">{item.title}</td>
											<td className="text-center">
												<span data-toggle="tooltip" data-placement="top" title={item.description}>
														{item.description.substring(0,40) + "..."}
												</span>
											</td>
											<td className="text-center">
												{item.quantity > 0 ? <p className="text-success"> In Stock </p> : <p className="text-danger">Stock Out</p>}
											</td>
											<td className="text-center">{item.cost_price}</td>
											<td className="text-center">{item.mrp_price}</td>
											<td className="text-center">{item.brand.name}</td>
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
											<td className="text-center">
												{
													item.tagList.length > 0 && item.tagList.map( (t, i, arr) => {
														if(arr.length -1 === i) {
															let str = t
															return str
														}
														else {
															let str = t + ", "
															return str
														}
													})
												}
											</td>
											<td className='text-center'>
	                                          <span
			                                          className="btn btn-md">
	                                                <EditOutlined/>
	                                          </span>
												<span
														className="btn btn-md">
                                                      <DeleteOutlined/>
                                              </span>
											</td>

										</tr>

									</tbody>
								))}
							</table>
						</div>

					</div>
				</div>
			</div>
	)

}

export default ListProducts;