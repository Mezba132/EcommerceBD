import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import {Spin} from "antd";
import {LOGGED_IN_USER} from "../../Constants";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../Functions/Auth";

const CompleteRegister = ({history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password || !confirmPassword) {
            toast.error('Email and password is required');
            return;
        }

        if (password.length < 4 && confirmPassword.length < 4 ) {
            toast.error('Password must be at least 4 character');
            return;
        }

        if(password !== confirmPassword) {
            toast.error("Password doesn't match.Please try again");
            return;
        }

        try {
            setLoading(true)
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log("Result", result);
            if (result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                // get user idtoken
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                // console.log('user', user, 'idTokenResult', idTokenResult);
                createOrUpdateUser(idTokenResult.token)
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
                // redirect
                // toast.success(`${user.email} succeessfully login`);
                history.push('/');
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message)
            setLoading(false);
        }
    };

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [])

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                <input
                    placeholder="Email"
                    className="form-control"
                    type="email"
                    value={email}
                    disabled
                />
            </div>
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                <input 
                    className="form-control" 
                    placeholder="Create password" 
                    type="password" 
                    value={password}
                    onChange={handlePassword}
                    autoFocus
                />
            </div> 
            <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                <input 
                    className="form-control" 
                    placeholder="Repeat password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={handleConfirmPassword}                    
                    autoFocus
                />
            </div>            
            <div class="form-group">
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={password.length < 5 || confirmPassword.length <5}
                > Confirm  </button>
            </div>
        </form>
    )

    return (
        <div className="container">
            <div className="card bg-light mb-5">
                <article className="card-body mx-auto">
                    {
                        loading ? <div > <Spin tip="Loading..." /> </div> : 
                          <React.Fragment>
                              <h4 className="card-title mt-3 text-center">Complete Registration</h4>
                              {completeRegistrationForm()}
                          </React.Fragment>
                    }
                </article>
            </div>
        </div>
    )
}

export default CompleteRegister;