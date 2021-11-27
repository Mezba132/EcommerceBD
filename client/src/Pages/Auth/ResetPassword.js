import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useSelector } from "react-redux";
import { resetPassword } from '../../Functions/Auth'

const ResetPassword = ({history}) => {

      const [email, setEmail] = useState('csmezba@gmail.com');
      const [loading, setLoading] = useState(false);

      const { user } = useSelector(user => user);

      useEffect(() => {
            if (user && user.token) history.push('/');
      },[user,history])

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);

            resetPassword(email)
                    .then(res => {
                        setEmail('')
                        setLoading(false);
                        toast.success(`Email is sent to ${email}. Check your email to reset password`);
                    })
                    .catch(err => {
                        setEmail('')
                        setLoading(false)
                        toast.error(err.response.data.error)
                    })
      }

      const forgotPasswordForm = () => (
            <form onSubmit={handleSubmit}>
                  <div className="form-group input-group mb-2">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        <input
                              name=""
                              placeholder="Type Your Email"
                              className="form-control"
                              type="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              autoFocus
                        />
                  </div>
                  <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={!email}> Send </button>
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
                                      <h4 className="card-title mt-3 text-center">Forgot Password</h4>
                                      {forgotPasswordForm()}
                                  </div>
                              }
                          </article>
                      </div>
                  </div>
            </div>
      )

}

export default ResetPassword;