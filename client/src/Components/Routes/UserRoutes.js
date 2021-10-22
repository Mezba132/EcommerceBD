import React from "react";
import { Link, Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadToRedirect from "../../Pages/User/LoadToRedirect";

const UserRoute = ({ children, ...rest }) => {
      const { user } = useSelector( user => user );

      console.log(user);

      return user && user.idToken ? (
            <Route {...rest} render={() => children} />
      ) : <LoadToRedirect />
}

export default UserRoute;