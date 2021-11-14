import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import { useDispatch } from "react-redux";
import {auth} from "./firebase";
import {LOGGED_IN_USER} from "./Constants";
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home';
import Header from './Components/Nav/Header';
import RegisterComplete from './Pages/Auth/CompleteRegister';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import History from "./Pages/User/History";
import { currentUser } from './Functions/Auth';
import UserRoute from "./Components/Routes/UserRoute";
import Password from "./Pages/User/Password";
import Wishlist from "./Pages/User/Wishlist";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Category from "./Pages/Admin/Category/Category";
import SubCategory from "./Pages/Admin/SubCategory/SubCategory";
import CreateProduct from "./Pages/Admin/Product/CreateProduct";
import CreateProducts from "./Pages/Admin/Product/CreateProducts";
import ListProducts from "./Pages/Admin/Product/ListProducts";

const App = () => {
    const dispatch = useDispatch();

    // to check Firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( async (user) => {
            if(user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: LOGGED_IN_USER,
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                idToken: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        })
                    })
                    .catch(err => console.log(err))
            }
        });
        // toast.success('Passwordless Verification Success');
        // cleanup
        return () => unsubscribe();
    },[dispatch])


  return (
      <BrowserRouter>
        <Header/>
        <ToastContainer />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/admin/category" component={Category} />
          <AdminRoute exact path="/admin/sub-category" component={SubCategory} />
          <AdminRoute exact path="/admin/create-product" component={CreateProduct} />
          <AdminRoute exact path="/admin/create-products" component={CreateProducts} />
          <AdminRoute exact path="/admin/list-products" component={ListProducts}/>

        </Switch>
      </BrowserRouter>
  )
}

export default App;
