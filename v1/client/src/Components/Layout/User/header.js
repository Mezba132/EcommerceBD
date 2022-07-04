import React from 'react';
import {Link} from 'react-router-dom';
import SearchForm from '../../Shared/Form/User/search';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

const Header = ({ toggleSidebar, toggleShoppingCart, totalCartItem }) => {

	let { user } = useSelector(user => user);
	const history = useHistory();

	const signIn = () => {
		history.push('/login')
	}

	const logOut = () => {
		localStorage.clear();
		window.location.reload()
	}

    return (
        <div id='headerContainer'>
				<div id='logoContainer'>
					<div id='burgerIconContainer' onClick={toggleSidebar}>
						<div className='burgerSlice'></div>
						<div className='burgerSlice'></div>
						<div className='burgerSlice'></div>
					</div>
					<div id='logo'><Link to='/'>KMart</Link></div>
				</div>
				<div id='headerSearchFormContainer'>
					<SearchForm />
				</div>
				<div id='headerCartIcon'>
					<div id='cartIconContainer'>
						<i
							onClick={toggleShoppingCart}
							id='cartIcon'
							className='fa fa-shopping-basket'
						></i>
						<span id='cartCounter'>{totalCartItem}</span>
					</div>
				</div>
				{user ? 
					<div>
						{/* <span id='logo'>{user.email && user.email.split('@')[0]}</span> */}
						<span id='logo' className="user">{user.name}</span>
						<span className="logout" onClick={logOut}>logOut</span>
					</div> 
						: 
					<div id='signIn' onClick={signIn}>
							SIGN IN
					</div>
				}
			</div>
    )
}

export default Header;