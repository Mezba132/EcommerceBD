import React from "react";
import AdminNav from "../../Components/Nav/AdminNav";

const AdminDashboard = () => (
      <div className="container-fluid">
            <div className="row">
                <div className="sticky-sidebar">
                    <AdminNav/>
                </div>
                <div className="adjustment">
                    <div className="container p-5 text-center">Admin Dashboard Page</div>
                </div>
            </div>
      </div>
)

export default AdminDashboard;