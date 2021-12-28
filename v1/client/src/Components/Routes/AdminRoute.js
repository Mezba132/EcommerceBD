import React, {useEffect, useState} from "react";
import { Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadToRedirect from "../../Pages/User/LoadToRedirect";
import {currentAdmin} from "../../Functions/Auth";

const AdminRoute = ({ ...rest }) => {

      const { user } = useSelector(user => user);
      const [ok, setOk] = useState(false);

      useEffect(() => {
            if(user && user.token) {
                  currentAdmin(user, user.token)
                        .then(res => {
                              setOk(true)
                        })
                        .catch(err => {
                              setOk(false)
                        })
            }
      }, [user])

      return ok ? (
            <Route { ...rest } />
      ) : < LoadToRedirect />

}

export default AdminRoute;