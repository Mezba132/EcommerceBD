import React, {useEffect, useState} from 'react';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import {auth, googleAuthProvider} from '../../firebase';
import { useDispatch } from "react-redux";
import {LOGGED_IN_USER} from "../../Constants";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

const Login = ({history}) => {

    const [email, setEmail] = useState('csmezba@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(user => user);

    useEffect(() => {
        if (user && user.idToken) history.push('/');
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            // console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: LOGGED_IN_USER,
                payload: {
                    email: user.email,
                    idToken: idTokenResult.token
                }
            })
            toast.success('Loging Success');
            history.push('/');
        }
        catch (e) {
            console.log(e);
            toast.error(e.message)
            setLoading(false);
        }
    };

    const googleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithPopup(googleAuthProvider);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: LOGGED_IN_USER,
                payload: {
                    email: user.email,
                    idToken: idTokenResult.token
                }
            })
            toast.success('Google Loging Success');
            history.push('/');
        }
        catch (e) {
            console.log(e);
            toast.error(e.message)
            setLoading(false);
        }
    }

    const facebookLogin = () => {
        //
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                <input
                    name=""
                    placeholder="Email"
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                />
            </div>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                <input
                    name=""
                    placeholder="Password"
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoFocus
                />
            </div>
            <div class="form-group">
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
        <div className="container">
            <div className="card bg-light mb-5">
                <article className="card-body mx-auto">
                    {loading ? <div > <Spin tip="Loading..." /> </div> :
                    <div>
                        <h4 className="card-title mt-3 text-center">LogIn</h4>
                        <p>
                            <button
                                  className="btn btn-block btn-danger mb-2"
                                  onClick={googleLogin}
                            >
                                <i className="fab fa-google"></i> Login via Google
                            </button>
                            <button
                                  className="btn btn-block btn-facebook"
                                  onClick={facebookLogin}
                            >
                                <i className="fab fa-facebook-f"></i> Login via facebook
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
    )
}

export default Login;