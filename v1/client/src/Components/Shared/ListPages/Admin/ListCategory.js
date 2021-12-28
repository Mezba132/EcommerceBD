import React from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const CategoryList = (
			{
				categories,
				searched,
				keyword,
				onOpenUpdateHandler,
				onOpenDeleteHandler,
				pagesVisited,
				categoriesPerPages
			}
		) => (
		<table className="table table-striped table-dark">
			<thead className="text-center">
			<tr>
				<th>Category Name</th>
				<th>Action</th>
			</tr>
			</thead>
			{/* Step-5 "filter(searched(keyword))" */}
			{
				categories
						.slice(pagesVisited, pagesVisited + categoriesPerPages)
						.filter(searched(keyword))
						.map( c =>
						<tbody key={c._id}>
						<tr>
							<td className='text-center'>{c.name}</td>
							<td className='text-center'>
	                              <span
	                                      onClick={() => onOpenUpdateHandler(c.slug)}
	                                      className="btn btn-md">
	                                            <EditOutlined/>
	                              </span>
									<span
											onClick={() => onOpenDeleteHandler(c.slug)}
											className="btn btn-md">
												<DeleteOutlined/>
									</span>
							</td>
						</tr>
						</tbody>
				)}
		</table>
)

export default CategoryList;