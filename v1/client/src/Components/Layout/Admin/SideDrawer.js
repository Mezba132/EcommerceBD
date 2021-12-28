import React, {useState} from "react";
import {
	BoldOutlined,
	ContainerOutlined,
	DashboardOutlined, FileDoneOutlined,
	KeyOutlined, MailOutlined, SettingOutlined, ShoppingOutlined, SmileOutlined, TeamOutlined,
	UserAddOutlined,
	UserOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Drawer, Menu} from "antd";
import { useSelector} from "react-redux";
const {SubMenu, Item} = Menu

const SideDrawer = ({onClose, visible}) => {

	const [current, setCurrent] = useState('');

	const { user } = useSelector(user => user);

	const handleClick = (e) => {
		setCurrent(e.key);
	}

	return (
			<Drawer
					title="Menu"
					placement="left"
					onClose={onClose}
					visible={visible}
			>
				<Menu
						onClick={handleClick}
						selectedKeys={[current]}
				>
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
					{user && <React.Fragment>
							<Item key="1" icon={<DashboardOutlined />}>
								<Link to="/admin/dashboard">Dashboard</Link>
							</Item>
							<SubMenu key="sub_d1" icon={<ContainerOutlined />} title="Category">
								<Item key="d2">
									<Link to="/admin/category">Create Category</Link>
								</Item>
								<Item key="d3">
									<Link to="/admin/sub-category">Sub Category</Link>
								</Item>
							</SubMenu>
							<Item key="4" icon={<BoldOutlined />}>
								<Link to="/admin/brand">Brand</Link>
							</Item>
							<SubMenu key="sub_d2" icon={<ShoppingOutlined />} title="Product">
								<Menu.Item key="5">
									<Link to="/admin/create-product">Create Product</Link>
								</Menu.Item>
								<Menu.Item key="6">
									<Link to="/admin/create-products">Create Products</Link>
								</Menu.Item>
								<Menu.Item key="7">
									<Link to="/admin/list-products">List Products</Link>
								</Menu.Item>
								<Menu.Item key="8">
									<Link to="/admin/reviews">Reviews</Link>
								</Menu.Item>
							</SubMenu>
							<Item key="9" icon={<SmileOutlined />}>
								<Link to="/admin/coupon">Coupon</Link>
							</Item>
							<Item key="10" icon={<FileDoneOutlined />}>
								<Link to="/admin/orders">Orders List</Link>
							</Item>
							<SubMenu key="sub_d3" icon={<UserOutlined />} title="Users">
								<Menu.Item key="11" >
									<Link to="/admin/users-local">Local Users</Link>
								</Menu.Item>
								<Menu.Item key="12" >
									<Link to="/admin/users-social">Social Users</Link>
								</Menu.Item>
							</SubMenu>
							<Item key="13" icon={<TeamOutlined />}>
								<Link to="/admin/customers">All Customers</Link>
							</Item>
							<Item key="14" icon={<UserAddOutlined />}>
								<Link to="/admin/career">Create Career</Link>
							</Item>
							<Item key="15" icon={<SettingOutlined />}>
								<Link to="/admin/settings">Settings</Link>
							</Item>
							<Item key="16" icon={<MailOutlined />}>
								<Link to="/admin/send-mail">Send Mail</Link>
							</Item>
							<Item key="17" icon={<KeyOutlined />}>
								<Link to="/user/password">Change Password</Link>
							</Item>
						</React.Fragment>
					}
				</Menu>
			</Drawer>
)}

export default SideDrawer;