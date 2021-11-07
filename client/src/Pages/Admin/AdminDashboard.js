import React from "react";
import AdminNav from "../../Components/Nav/AdminNav";

const AdminDashboard = () => (
      <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div className="col-md-6 bg-dark h-100" id="sticky-sidebar">
                        <AdminNav/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="container p-5 text-center">Admin Dashboard Page</div>
                </div>
            </div>
      </div>
)

export default AdminDashboard;