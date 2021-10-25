import React, {useState} from "react";
import UserNav from "../../Components/Nav/UserNav";
import { auth } from "../../firebase";
import {Spin, spin} from 'antd';
import {toast} from "react-toastify";

const Password = () => {

      const [password, setPassword] = useState('')
      const [loading, setLoading] = useState(false)

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            await auth.currentUser.updatePassword(password)
                  .then(() => {
                        setLoading(false);
                        setPassword('')
                        toast.success('Password Update Successfully');

                  })
                  .catch(err =>
                  {
                        toast.error(err.message)
                        setLoading(false);
                  })
      }

      const passwordForm = () => (
            <form onSubmit={handleSubmit}>
                  <div className="form-group">
                        <h1 className="text-center font-weight-bold">Password Update</h1>
                        <label><h3>New Password</h3></label>
                        <input
                              name=""
                              placeholder="Set New Password"
                              className="form-control"
                              type="password"
                              onChange={e => setPassword(e.target.value)}
                              autoFocus
                              value={password}
                              disabled={loading}
                        />
                  </div>
                  <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!password || password.length < 6 || loading} > Submit
                  </button>
            </form>
      )

      return (

                  <div className="container-fluid">
                        <div className="row">
                              <div className="col-md-2">
                                    <UserNav/>
                              </div>
                              <div className="container p-5">
                                    {loading ? <div className="text-center"> <Spin tip="Loading..." /> </div> :  passwordForm()}
                              </div>
                        </div>
                  </div>
      )}

export default Password;