import React from "react";
import { Link } from 'react-router-dom'

const AdminNav = () => {

    return(
            <nav className="mt-2">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/create-product" className="nav-link text-success">Create Product</Link>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/create-products" className="nav-link text-success">Create Products</Link>
                    </li>
                </ul>
                <ul className="nav flex-column ">
                    <li className="nav-item">
                        <Link to="/admin/list-products" className="nav-link text-success">List Products</Link>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/brand" className="nav-link text-success">Brand</Link>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/category" className="nav-link text-success">Category</Link>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/sub-category" className="nav-link text-success">Sub Category</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/coupon" className="nav-link">Coupon</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/users" className="nav-link">All Users</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/customers" className="nav-link">All Customers</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/orders" className="nav-link">Orders List</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/reviews" className="nav-link">Product Reviews</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/career" className="nav-link">Create Career</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/settings" className="nav-link">Settings</Link>
                    </li>
                </ul>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/user/password" className="nav-link">Change Password</Link>
                    </li>
                </ul>
            </nav>
)}

export default AdminNav;