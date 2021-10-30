import React from "react";
import AdminNav from "../../Components/Nav/AdminNav";

const AdminDashboard = () => (
      <div className="container-fluid">
            <div className="row">
                  <div className="col-md-2">
                        <AdminNav />
                  </div>
                  <div className="container p-5 text-center">Admin Dashboard Page</div>
            </div>
      </div>
)

export default AdminDashboard;