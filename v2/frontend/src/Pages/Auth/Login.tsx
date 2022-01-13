import React, {useEffect, useState} from "react";
import Header from "../../Shared/Layout/Auth/Header";
import Footer from "../../Shared/Layout/Auth/Footer";
import LoginForm from "../../Shared/Components/Form/Login";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import {useMutation} from "@apollo/client";
import { SignIn } from "../../Redux/Actions/auth";
import {LOGGED_IN_ADMIN, LOGGED_IN_USER} from "../../Redux/Constants";
import {authenticate} from "../../Func/Auth";
import { useNavigate } from 'react-router-dom';

const Login = ( ) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [ login, { error } ] = useMutation(SignIn)
    const navigate = useNavigate();

    const roleBasedUser = (user : any) => {
        if(user.role === 'admin') {
            navigate('/');
        }
        else {
            navigate('/')
        }
    }

    const onFinish = (values: any) => {
        setIsLoading(true);
        try {
            if(error) {
                console.log(error)
            }
            else {
                login({
                    variables : {
                        email: values.email,
                        hashPassword : values.password
                    }
                })
                    .then(res => {
                        const data = res.data.login;
                        console.log("Login Successful", data)
                        authenticate(data);

                        let user = res.data.login.user;
                        let token = res.data.login.token;

                        if(user && token && user.role === 'customer') {
                            dispatch({
                                type: LOGGED_IN_USER,
                                payload: {
                                    name: user.name,
                                    email: user.email,
                                    token: user.token,
                                    role: user.role,
                                    _id: user._id,
                                }
                            })
                        }

                        if(user && token && user.role === 'admin') {
                            dispatch({
                                type: LOGGED_IN_ADMIN,
                                payload: {
                                    name: user.name,
                                    email: user.email,
                                    token: user.token,
                                    role: user.role,
                                    _id: user._id,
                                }
                            })
                        }

                        setIsLoading(false)
                        roleBasedUser(user)
                    })
                    .catch(err => {
                        console.log(err)
                        setIsLoading(false)
                    })
            }
        }
        catch (e) {
            console.log(e)
            setIsLoading(false);
        }
    }

        return (
            <React.Fragment>
                <Header/>
                {isLoading ? <Spin/> :
                    <div className='card bg-light m-5'>
                        <div className='card-body mx-auto'>
                            <h1 className="card-title text-center">SignIn</h1>
                            <p>
                                <button
                                    className="btn btn-block btn-danger"
                                    // onClick={googleLogin}
                                >
                                    <i className="fa fa-google"></i> Google
                                </button>
                                <button
                                    className="btn btn-block btn-primary"
                                    // onClick={facebookLogin}
                                >
                                    <i className="fa fa-facebook-f"></i> Facebook
                                </button>
                                <button
                                    className="btn btn-block btn-dark"
                                    // onClick={githubLogin}
                                >
                                    <i className="fa fa-github"></i> Github
                                </button>
                            </p>
                            <LoginForm handleSubmit={(values: any) => onFinish(values)}/>
                        </div>
                    </div>
                }
                <Footer/>
                </React.Fragment>
        )
}

export default Login;