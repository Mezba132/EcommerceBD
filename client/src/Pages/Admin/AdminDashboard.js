import React from "react";
import {Layout} from "antd";
const { Content } = Layout
import HeaderAdmin from "../../Components/Layout/Admin/Header";
import SideBar from "../../Components/Layout/Admin/Sidebar";
import FooterAdmin from "../../Components/Layout/Admin/Footer";

const AdminDashboard = () => (
        <Layout>
            <HeaderAdmin/>
            <SideBar/>
            <Layout className='content-layout'>
                <Content className="site-layout-background content">
                    <div className="container p-5 text-center">Admin Dashboard Page</div>
                </Content>
            </Layout>
            <FooterAdmin/>
        </Layout>
)

export default AdminDashboard;