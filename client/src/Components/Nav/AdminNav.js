import { Link } from 'react-router-dom'

const AdminNav = () => (
      <nav className="mt-5">
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                  </li>
            </ul>
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/admin/create-product" className="nav-link">Create Product</Link>
                  </li>
            </ul>
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/admin/all-products" className="nav-link">All Products</Link>
                  </li>
            </ul>
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/admin/category" className="nav-link">Category</Link>
                  </li>
            </ul>
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/admin/sub-category" className="nav-link">Sub Category</Link>
                  </li>
            </ul>
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/admin/coupon" className="nav-link">Coupon</Link>
                  </li>
            </ul>
            <ul className="nav flex-column mb-3">
                  <li className="nav-item">
                        <Link to="/user/password" className="nav-link">Change Password</Link>
                  </li>
            </ul>
      </nav>
)

export default AdminNav;