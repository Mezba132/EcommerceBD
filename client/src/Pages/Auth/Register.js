import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import {useSelector} from "react-redux";

const Register = ({history}) => {

    const [email, setEmail] = useState('');

    const { user } = useSelector(user => user);

    useEffect(() => {
        if (user && user.idToken) history.push('/');
    },[user,history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                <input
                    name=""
                    placeholder="Your Email"
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                />
            </div>
            <div class="form-group">
                <button type="submit" className="btn btn-primary btn-block"> Send Verification To Email  </button>
            </div>
        </form>
    )

    return (
        <div className="container">
            <div className="card bg-light mb-5">
                <article className="card-body mx-auto">
                    <h4 className="card-title mt-3 text-center">Register Account</h4>
                    {registerForm()}
                </article>
            </div>
        </div>
    )
}

export default Register;