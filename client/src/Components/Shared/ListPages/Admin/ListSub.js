import React from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const SubList = (
			{
				subCategories,
				searched,
				keyword,
				pagesVisited,
				subCatsPerPage,
				onOpenUpdateHandler,
				onOpenDeleteHandler
			}
		) => (
		<table className="table table-striped table-dark">
			<thead className="text-center">
			<tr>
				<th>Sub-Category Name</th>
				<th>Category Name</th>
				<th>Action</th>
			</tr>
			</thead>
			{subCategories
				.filter(searched(keyword))
				.slice(pagesVisited, pagesVisited + subCatsPerPage)
				.map( s =>
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
)

export default SubList;