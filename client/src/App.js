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

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( async (user) => {
            if(user) {
                // console.log("user: ", user);
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: LOGGED_IN_USER,
                    payload : {
                        email: user.email,
                        idToken: idTokenResult.token
                    }
                })
            }
        });
        toast.success('Passwordless Verification Success');
        // cleanup
        return () => unsubscribe();
    },[])


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
        </Switch>
      </BrowserRouter>
  )
}

export default App;
