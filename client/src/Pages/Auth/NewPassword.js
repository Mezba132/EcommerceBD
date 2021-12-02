import React, {useEffect, useState} from 'react';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import  { useParams } from 'react-router-dom';
import { newPassword } from '../../Functions/Auth'
import {useSelector} from "react-redux";

const NewPassword = ({history}) => {

	const [newPass, setNewPass] = useState('');
	const [loading, setLoading] = useState(false);

	const { token }  = useParams()
	const { user } = useSelector(user => user);

	useEffect(() => {
		let isMounted = true
		if(user && user.token) {
			if (isMounted) history.push('/')
		}
		// cleanup
		return () => { isMounted = false }
	},[user,history])


	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		newPassword(newPass, token)
				.then(res => {
					setNewPass('')
					setLoading(false)
					toast.success(res.data.message)
					history.push('/login');
				})
				.catch(err => {
					console.log(err)
					setNewPass('')
					setLoading(false)
					toast.error(err.response.data.error)
				})

	};

	const loginForm = () => (
			<form onSubmit={handleSubmit}>
				<div className="form-group input-group mb-2">
					<span className="input-group-text"> <i className="fa fa-lock"></i> </span>
					<input
							name="password"
							placeholder="Password"
							className="form-control"
							type="password"
							value={newPass}
							onChange={e => setNewPass(e.target.value)}
							autoFocus
					/>
				</div>
				<div className="form-group">
					<button
						type="submit"
						className="btn btn-primary btn-block"
					>
						Confirm
					</button>
				</div>
			</form>
	)

	return (
			<div className="container-fluid">
				<div className="adjustment">
					<div className="card bg-light mb-5">
						<article className="card-body mx-auto">
							{loading ? <div > <Spin tip="Loading..." /> </div> :
								<div>
									<h4 className="card-title mt-3 text-center">Reset Password</h4>
									{loginForm()}
								</div>
							}
						</article>
					</div>
				</div>
			</div>
	)
}

export default NewPassword;