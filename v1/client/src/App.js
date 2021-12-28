import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {useDispatch, useSelector} from "react-redux";
import {LOGGED_IN_USER, LOGGED_IN_ADMIN} from "./Redux/Constants";
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import NewPassword from "./Pages/Auth/NewPassword";
import ResetPassword from './Pages/Auth/ResetPassword';
import History from "./Pages/User/History";
import {currentAdmin, currentUser, isAuthenticate} from './Functions/Auth';
import UserRoute from "./Components/Routes/UserRoute";
import Wishlist from "./Pages/User/Wishlist";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Category from "./Pages/Admin/Category/Category";
import SubCategory from "./Pages/Admin/SubCategory/SubCategory";
import CreateProduct from "./Pages/Admin/Product/CreateProduct";
import CreateProducts from "./Pages/Admin/Product/CreateProducts";
import ListProducts from "./Pages/Admin/Product/ListProducts";
import Brand from "./Pages/Admin/Brand/Brand";
import LocalAuthUser from "./Pages/Admin/User";

const App = () => {
    const dispatch = useDispatch();
    const { user } = isAuthenticate()

    useEffect(() => {

        let isMounted = true;

            if (user && user.token && user.role === 'subscriber') {

                 currentUser(user, user.token)
                        .then((res) => {
                            if(isMounted) {
                                let data = res.data;
                                dispatch({
                                    type: LOGGED_IN_USER,
                                    payload: {
                                        name: data.name,
                                        email: data.email,
                                        token: user.token,
                                        role: data.role,
                                        _id: data._id,
                                    }
                                })
                            }
                        })
                        .catch(err => console.log(err))

            }

            if (user && user.token && user.role === 'admin') {

                 currentAdmin(user, user.token)
                        .then((res) => {
                            if(isMounted) {
                                let data = res.data;
                                dispatch({
                                    type: LOGGED_IN_ADMIN,
                                    payload: {
                                        name: data.name,
                                        email: data.email,
                                        token: user.token,
                                        role: data.role,
                                        _id: data._id,
                                    }
                                })
                            }
                        })
                        .catch(err => console.log(err))

            }

        // cleanup
        return () => { isMounted = false};

    },[dispatch, user])


  return (
      <BrowserRouter>
        {/*<Header/>*/}
        <ToastContainer />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/new-password/:token" component={NewPassword} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/admin/category" component={Category} />
          <AdminRoute exact path="/admin/sub-category" component={SubCategory} />
          <AdminRoute exact path="/admin/create-product" component={CreateProduct} />
          <AdminRoute exact path="/admin/create-products" component={CreateProducts} />
          <AdminRoute exact path="/admin/list-products" component={ListProducts}/>
          <AdminRoute exact path="/admin/brand" component={Brand} />
          <AdminRoute exact path="/admin/users-local" component={LocalAuthUser} />

        </Switch>
      </BrowserRouter>
  )
}

export default App;
