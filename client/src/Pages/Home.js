import React from 'react';
import { useSelector } from "react-redux";

const Home = () => {

      let { user } = useSelector(user => user);
  return (
    <div className='text-center'>
          {!user &&
                <h1>Welcome to Homepage</h1>
          }
          {user &&
                <h1>Welcome to Homepage {user.email && user.email.split('@')[0]}</h1>
          }
    </div>
  )
}

export default Home;