import React, {useEffect, useState} from "react";
import {  Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadToRedirect from "../../Pages/User/LoadToRedirect";
import { currentAdmin } from "../../Functions/auth";

const AdminRoute = ({ ...rest }) => {

      const { user } = useSelector( user => user );
      const [ok, setOk] = useState(false);

      useEffect(() => {
            if(user && user.idToken) {
                  currentAdmin(user.idToken)
                        .then(res => {
                              console.log("current admin res", res);
                              setOk(true)
                        })
                        .catch(err => {
                              console.log("Admin error", err);
                              setOk(false)
                        })
            }
      }, [user])

      return ok ? (
            <Route { ...rest } />
      ) : < LoadToRedirect />

}

export default AdminRoute;