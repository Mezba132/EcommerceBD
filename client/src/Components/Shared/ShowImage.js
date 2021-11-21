import React from "react";
import {Avatar} from "antd";
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

const ShowImage = ({values}) => (
		<div className="d-flex flex-md-row">
			{
				values.images &&
				values.images.map( img => (
						<Avatar
								shape="square"
								size={200}
								src={img.url}
								icon={<UserOutlined />}
								className="bg-dark p-1 mr-3"
						/>
					)
			)}
		</div>
)

export default ShowImage;