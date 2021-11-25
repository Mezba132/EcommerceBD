import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserSwitchOutlined, UserOutlined, UserAddOutlined, DashboardOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {userSignOut} from '../../Functions/Auth';
import { LOGOUT } from "../../Constants";
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
        userSignOut()
            .then(res => {
                dispatch({
                    type: LOGOUT,
                    payload: null
                })
                localStorage.clear()
                toast.success(res.data)
                history.push('/');
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {},[user]);

    return(
            <div className="fixed-header">
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
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
                            {user && user.role === "subscriber" &&
                                <Item icon={<DashboardOutlined/>}>
                                    <Link to="/user/history">Dashboard</Link>
                                </Item>
                            }

                            {user && user.role === "admin" &&
                                <Item icon={<DashboardOutlined/>}>
                                    <Link to="/admin/dashboard">Dashboard</Link>
                                </Item>
                            }
                                <Item key="logout" icon={<UserOutlined/>} onClick={logout}>Logout</Item>
                        </SubMenu>
                    }
                </Menu>
            </div>

    )
}

export default Header;