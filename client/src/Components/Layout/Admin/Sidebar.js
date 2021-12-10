import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { Menu, Layout } from 'antd';
import {
	DashboardOutlined,
	ContainerOutlined,
	BoldOutlined,
	ShoppingOutlined,
	KeyOutlined,
	FileDoneOutlined,
	UserOutlined,
	MailOutlined,
	TeamOutlined,
	UserAddOutlined,
	SettingOutlined,
	SmileOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const { SubMenu } = Menu;

const SideBar = (props) => {

	const [current, setCurrent] = useState('');

	const handleClick = (e) => {
		setCurrent(e.key);
	}

	const [ toggleCollapsed, setToggleCollapsed ] = useState(false)

	const changeToggleCollapsed = () => {
		setToggleCollapsed(!toggleCollapsed)
	}

	useEffect(() => {},[current]);

	return(
			<div className="sticky-sidebar">
				<Sider collapsible collapsed={toggleCollapsed} onCollapse={changeToggleCollapsed}>
					<Menu
							mode="inline"
							theme="dark"
							onClick={handleClick}
							defaultSelectedKeys={[`${current}`]}
							defaultOpenKeys={[`${current}`]}
					>
						<Menu.Item key="1" icon={<DashboardOutlined />}>
							<Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
						</Menu.Item>
						<SubMenu key="sub1" icon={<ContainerOutlined />} title="Category">
							<Menu.Item key="2">
								<Link to="/admin/category" className="nav-link text-success">Create Category</Link>
							</Menu.Item>
							<Menu.Item key="3">
								<Link to="/admin/sub-category" className="nav-link text-success">Sub Category</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="4" icon={<BoldOutlined />}>
							<Link to="/admin/brand" className="nav-link text-success">Brand</Link>
						</Menu.Item>
						<SubMenu key="sub2" icon={<ShoppingOutlined />} title="Product">
							<Menu.Item key="5">
								<Link to="/admin/create-product" className="nav-link text-success">Create Product</Link>
							</Menu.Item>
							<Menu.Item key="6">
								<Link to="/admin/create-products" className="nav-link text-success">Create Products</Link>
							</Menu.Item>
							<Menu.Item key="7">
								<Link to="/admin/list-products" className="nav-link text-success">List Products</Link>
							</Menu.Item>
							<Menu.Item key="8">
								<Link to="/admin/reviews" className="nav-link">Reviews</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="9" icon={<SmileOutlined />}>
							<Link to="/admin/coupon" className="nav-link">Coupon</Link>
						</Menu.Item>
						<Menu.Item key="10" icon={<FileDoneOutlined />}>
							<Link to="/admin/orders" className="nav-link">Orders List</Link>
						</Menu.Item>
						<SubMenu key="sub3" icon={<UserOutlined />} title="Users">
							<Menu.Item key="11" >
								<Link to="/admin/users-local" className="nav-link">Local Users</Link>
							</Menu.Item>
							<Menu.Item key="12" >
								<Link to="/admin/users-social" className="nav-link">Social Users</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="13" icon={<TeamOutlined />}>
							<Link to="/admin/customers" className="nav-link">All Customers</Link>
						</Menu.Item>
						<Menu.Item key="14" icon={<UserAddOutlined />}>
							<Link to="/admin/career" className="nav-link">Create Career</Link>
						</Menu.Item>
						<Menu.Item key="15" icon={<SettingOutlined />}>
							<Link to="/admin/settings" className="nav-link">Settings</Link>
						</Menu.Item>
						<Menu.Item key="16" icon={<MailOutlined />}>
							<Link to="/admin/send-mail" className="nav-link">Send Mail</Link>
						</Menu.Item>
						<Menu.Item key="17" icon={<KeyOutlined />}>
							<Link to="/user/password" className="nav-link">Change Password</Link>
						</Menu.Item>
					</Menu>
				</Sider>
			</div>
	)
}

export default SideBar;