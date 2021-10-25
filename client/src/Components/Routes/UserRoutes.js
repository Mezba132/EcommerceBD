import React, {useState} from "react";
import { Link, Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadToRedirect from "../../Pages/User/LoadToRedirect";

const UserRoute = ({ children, ...rest }) => {
      const [loading, setLoading] = useState(true)
      const { user } = useSelector( user => user );

      return user && user.idToken && loading ? (
            <Route { ...rest } render={ () => children} />
      ) : < LoadToRedirect />
}

export default UserRoute;