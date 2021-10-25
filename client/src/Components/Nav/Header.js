import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserSwitchOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../Constants";
import firebase from "firebase";
import {toast} from "react-toastify";

const { SubMenu, Item } = Menu;

const Header = () => {

    const [current, setCurrent] = useState('');

    const dispatch = useDispatch();
    const { user } = useSelector(user => user);

    const history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: LOGOUT,
            payload: null
        })
        // toast.success('Logout success');
        history.push('/');
    }

    useEffect(() => {},[user]);

    return(
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                  <Item key="home" icon={<HomeOutlined/>}>
                        <Link to='/'>Home</Link>
                  </Item>
                  {!user &&
                        <Item key="register" icon={<UserAddOutlined/>} className="float-right">
                              <Link to='/login'>Login</Link>
                        </Item>
                  }
                  {!user &&
                        <Item key="login" icon={<UserOutlined/>} className="float-right">
                              <Link to='/register'>Register</Link>
                        </Item>
                  }
                  {user &&
                        <SubMenu
                              key="SubMenu" icon={<UserSwitchOutlined/>}
                              title={user.email && user.email.split('@')[0]}
                              className='float-right'
                        >
                              {/*<Item key="setting:1">User</Item>*/}
                              {/*<Item key="setting:2">admin</Item>*/}
                              <Item key="logout" icon={<UserOutlined/>} onClick={logout}>Logout</Item>
                        </SubMenu>
                  }
            </Menu>
    )
}

export default Header;