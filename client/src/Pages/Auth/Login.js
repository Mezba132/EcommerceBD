import React, {useEffect, useState} from 'react';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { LOGGED_IN_USER } from "../../Constants";
import { Link } from "react-router-dom";
import { userSignIn, authenticate } from '../../Functions/Auth'
const initialState = {
    email : "leomezba@gmail.com",
    password : "m12345"
}

const Login = ({history}) => {

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const { email, password } = values;

    const dispatch = useDispatch();
    const { user } = useSelector(user => user);

    useEffect(() => {
        if(user && user.token) history.push('/')
        setValues({...values})
    },[user,history])

    const roleBasedUser = (res) => {
        if(res.user.role === 'admin') {
            history.push('/admin/dashboard');
        }
        else {
            history.push('/user/history');
        }
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            userSignIn(values)
                .then(res => {
                    authenticate(res.data, () => {
                        setValues({...values})
                    })
                    dispatch({
                        type: LOGGED_IN_USER,
                        payload: {
                            name: res.data.user.name,
                            email: res.data.user.email,
                            token: res.data.user.token,
                            role: res.data.user.role,
                            _id: res.data.user._id,
                        }
                    })
                    setLoading(false);
                    toast.success('Login Successfully');
                    setValues(initialState);
                    roleBasedUser(res.data);
                })
                .catch(e => {
                    let err = e.response.data
                    toast.error(err.error)
                    setLoading(false);
                    setValues(initialState)
                })
            }
        catch (e) {
            toast.error(e.message)
            setLoading(false);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                <input
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    autoFocus
                />
            </div>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                <input
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    autoFocus
                />
            </div>
            <div className="form-group">
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={!email || password.length < 4}
                >
                    <i className="fas fa-sign-in-alt"></i> Login
                </button>
            </div>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="adjustment">
                <div className="card bg-light mb-5">
                    <article className="card-body mx-auto">
                        {loading ? <div > <Spin tip="Loading..." /> </div> :
                                <div>
                                    <h4 className="card-title mt-3 text-center">LogIn</h4>
                                    <p>
                                        <button
                                                className="btn btn-block btn-danger"
                                                // onClick={googleLogin}
                                        >
                                            <i className="fa fa-google"></i> Login via Google
                                        </button>
                                        <button
                                                className="btn btn-block btn-facebook"
                                                // onClick={facebookLogin}
                                        >
                                            <i className="fa fa-facebook-f"></i> Login via Facebook
                                        </button>
                                        <button
                                                className="btn btn-block btn-dark"
                                                // onClick={githubLogin}
                                        >
                                            <i className="fa fa-github"></i> Login via Github
                                        </button>
                                    </p>
                                    <p className="divider-text">
                                        <span className="bg-light">OR</span>
                                    </p>
                                    {loginForm()}
                                    <span>
                            <ul className='float-right'>
                                <li className='list-unstyled text-right'>
                                    <p><Link to='/forgot/password'>Forgot Password</Link></p>
                                </li>
                                <li className='list-unstyled text-right'>
                                    <p>Not Registered ? <Link to='/register'>SignUp</Link></p>
                                </li>
                            </ul>
                        </span>
                                </div>
                        }
                    </article>
                </div>
            </div>
        </div>
    )
}

export default Login;