import React from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const BrandList = (
			{
				brands,
				searched,
				keyword,
				onOpenUpdateHandler,
				onOpenDeleteHandler,
				pagesVisited,
				brandsPerPage
			}
		) => (
	<table className="table table-striped table-dark">
		<thead className="text-center">
		<tr>
			<th>Brand Name</th>
			<th>Action</th>
		</tr>
		</thead>
		{
			brands
					.slice(pagesVisited, pagesVisited + brandsPerPage)
					.filter(searched(keyword))
					.map( b =>
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
)

export default BrandList;