import React, {useState} from "react";
import Resizer from 'react-image-file-resizer';
import { useSelector } from "react-redux"
import axios from "axios";
import {Avatar, Badge} from "antd";
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

const FileUpload = ({values, setValues}) => {

	const [loading, setLoading] = useState(false);
	const { user }  = useSelector(user => user);

	const uploadandresize = (e) => {
		let files = e.target.files;
		let uploadedFiles = values.images

		if(files) {
			setLoading(true)
			for(let file of files) {
				Resizer.imageFileResizer(
					file,
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						axios.post(`${process.env.REACT_APP_API}/upload-images`,
							{image : uri},
							{
									headers: {
										authtoken : user ? user.idToken : ""
									}
								}
							)
							.then((res) => {
								console.log("Uploaded Images", res.data);
								setLoading(false);
								uploadedFiles.push(res.data)

								setValues({ ...values, images: uploadedFiles })
							})
							.catch(err => {
								setLoading(false)
								console.log(err)
							})
					},
					"base64"
				)
			}
		}

	}

	const handleImageRemove = (public_id) => {
		axios.post(`${process.env.REACT_APP_API}/remove-image`, {public_id},
				{
					headers: {
						authtoken : user ? user.idToken : ""
					}
				})
				.then((res) => {
					setLoading(false);
					let filteredImages = values.images.filter((item) => {
						return item.public_id !== public_id
					})
					setValues({ ...values, images : filteredImages })
				})
				.catch( err => {
					setLoading(false);
					console.log(err)
				})
	}

	return (
			<React.Fragment>

				{loading ? <LoadingOutlined className="text-success h1" /> :
					<div>
						<input
								type="file"
								multiple
								className="form-control-file mb-3"
								accept="images/*"
								onChange={ uploadandresize }
						/>
						{values.images && values.images.map( img => (
							<Badge
									count="X"
									key={img.public_id}
									onClick={() => handleImageRemove(img.public_id)}
									className="pointer"
							>
								<Avatar
									shape="square"
									size={100}
									src={img.url}
									icon={<UserOutlined />}
									className="ml-3 mb-3"
								/>
							</Badge>
						))}
					</div>
				}

			</React.Fragment>
	)

}

export default FileUpload;