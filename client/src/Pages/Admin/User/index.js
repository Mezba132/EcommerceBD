import React from "react";
import {Layout} from "antd";
const { Content } = Layout
import HeaderAdmin from "../../../Components/Layout/Admin/Header";
import SideBar from "../../../Components/Layout/Admin/Sidebar";
import FooterAdmin from "../../../Components/Layout/Admin/Footer";


const LocalAuthUser = () => {

	return (
			<Layout>
				<HeaderAdmin/>
				<SideBar/>
				<Layout
						style={{
							marginTop : '80px',
							marginLeft: '200px',
							padding: '0 24px 24px',
							width : '100%'
						}}>
					<Content
							className="site-layout-background"
							style={{
								width : '80rem',
								padding: 24,
								margin: 0,
								minHeight: 600,
							}}
					>
						<div className="container p-5 text-center">User List Page</div>
					</Content>
					<FooterAdmin/>
				</Layout>
			</Layout>
	)
}

export default LocalAuthUser