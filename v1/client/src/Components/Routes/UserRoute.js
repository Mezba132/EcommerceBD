import React from "react";
import {  Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadToRedirect from "../../Pages/User/LoadToRedirect";

const UserRoute = ({ ...rest }) => {
      const { user } = useSelector( user => user );

      return user && user.token ? (
            <Route { ...rest } />
      ) : < LoadToRedirect />
}

export default UserRoute;