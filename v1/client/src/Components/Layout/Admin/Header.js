import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserSwitchOutlined, UserOutlined, UserAddOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {userSignOut} from '../../../Functions/Auth';
import { LOGOUT } from "../../../Redux/Constants";
import {toast} from "react-toastify";

import { Menu, Layout } from 'antd';
import SideDrawer from "./SideDrawer";

const { Header } = Layout;

const { SubMenu, Item } = Menu;

const HeaderAdmin = () => {

	const [current, setCurrent] = useState('');
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();
	const { user } = useSelector(user => user);

	const handleClick = (e) => {
	    setCurrent(e.key);
	}

	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	const logout = () => {
		userSignOut()
				.then(res => {
					dispatch({
						type: LOGOUT,
						payload: null
					})
					localStorage.clear()
					toast.success(res.data)
					window.location.href='/';
					return false;
				})
				.catch(err => console.log(err))
	}

	useEffect(() => {},[user]);

	return(
			<div className='fixed-header'>
				<Header className="header">
					<span className="menubar" onClick={showDrawer}>
					    <MenuOutlined />
					</span>
					<SideDrawer
						onClose = {onClose}
						visible = {visible}
					/>
					<Menu onClick={handleClick} className="menu" theme='dark' selectedKeys={[current]} mode="horizontal" >
						<Item key="home" icon={<HomeOutlined/>}>
							<Link to='/'>Home</Link>
						</Item>
						{!user &&
						<Item key="register" icon={<UserAddOutlined/>} className="float-right">
							<Link to='/login'>Login</Link>
						</Item>
						}
						{!user &&
						<Item key="login" icon={<UserOutlined/>} className="float-right">
							<Link to='/register'>Register</Link>
						</Item>
						}
						{user &&
						<SubMenu
								key="SubMenu" icon={<UserSwitchOutlined/>}
								title={user.email && user.email.split('@')[0]}
								className='float-right'
						>
							{user && user.role === "subscriber" &&
							<Item key="subscriber" icon={<DashboardOutlined/>}>
								<Link to="/user/history">Dashboard</Link>
							</Item>
							}

							{user && user.role === "admin" &&
							<Item key="admin" icon={<DashboardOutlined/>}>
								<Link to="/admin/dashboard">Dashboard</Link>
							</Item>
							}
							<Item key="logout" icon={<UserOutlined/>} onClick={logout}>Logout</Item>
						</SubMenu>
						}
					</Menu>
				</Header>
			</div>
	)
}

export default HeaderAdmin;
