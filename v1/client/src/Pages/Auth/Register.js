import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { userSignUp } from '../../Functions/Auth'
import {useSelector} from "react-redux";

const initialState = {
    name : "",
    email : "",
    mobile : "",
    password : ""
}

const Register = ({history}) => {

    const [values, setValues] = useState(initialState);

    const { name, email, mobile, password } = values;

    const { user } = useSelector(user => user);

    useEffect(() => {
        if( user && user.token ) history.push('/admin/dashboard')
    },[user, history])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        userSignUp(values)
                .then(res => {
                    setValues(initialState)
                    toast.success(`Successfully Registered`);
                })
                .catch(err => {
                    toast.error(`Registration Failed. Try Again`);
                })
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                <input
                        name="name"
                        placeholder="Full Name"
                        className="form-control"
                        type="text"
                        required
                        value={name}
                        onChange={handleChange}
                        autoFocus
                />
            </div>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                <input
                        name="mobile"
                        placeholder="Phone Number "
                        className="form-control"
                        type="number"
                        required
                        value={mobile}
                        onChange={handleChange}
                        autoFocus
                />
            </div>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                <input
                    name="email"
                    placeholder="Your Email"
                    className="form-control"
                    type="email"

                    required
                    value={email}
                    onChange={handleChange}
                    autoFocus
                />
            </div>

            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-key"></i> </span>
                <input
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        required
                        value={password}
                        onChange={handleChange}
                        autoFocus
                />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block"> Confirm </button>
            </div>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="adjustment">
                <div className="card bg-light mb-5">
                    <article className="card-body mx-auto">
                        <h4 className="card-title mt-3 text-center">Register Account</h4>
                        {registerForm()}
                    </article>
                </div>
            </div>
        </div>
    )
}

export default Register;