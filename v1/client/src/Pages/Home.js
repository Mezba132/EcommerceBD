import React, {Fragment, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from '../Components/Layout/User/header';
import SideBar from '../Components/Layout/User/sidebar';
import Body from '../Components/Layout/User/body';
import { FetchNewProducts, FetchBestProducts } from '../Redux/Actions/Shop/product';
import ShoppingCart from '../Components/Shared/ShoppingCart';

const initialState = {
      isShowSidebar : true,
      isShowShoppingCart: false,
      cart: {},
      totalCartItem : 0,
}

const Home = () => {

      const [ data, setData ] = useState(initialState);

      const { isShowSidebar, isShowShoppingCart, cart, totalCartItem } = data;

	const dispatch = useDispatch()
	const { home } = useSelector(state => state)
      
	const newProducts = home.getNewProducts;
      const bestProducts = home.getBestProducts;


	useEffect(() => {
		let isMounted = true
		if(isMounted) {
			loadNewProducts()
                  loadBestProducts()
		}
		// cleanup
		return () => { isMounted = false }
	},[dispatch])

	const loadNewProducts = () => {
		dispatch(FetchNewProducts());
	}

      const loadBestProducts = () => {
		dispatch(FetchBestProducts());
	}

      const toggleSidebar = () => {
            setData({ ...data, isShowSidebar : !isShowSidebar})
      }

      const toggleShoppingCart = () => {
            setData({ ...data, isShowShoppingCart : !isShowShoppingCart})
      }

      const getTotalCartItem = () => {
            return Object.values(cart).length;
      }

      const addToCartHandler = (product) => { 
		cart[product._id] = {product: product, quantity: 1};
		setData({cart: cart, totalCartItem: getTotalCartItem()});
	}

      const setProductQuantityToCart = (productId, quantity) => {
		cart[productId].quantity = quantity;
		setData({...data, cart: cart});
	}

      const productRemoveHandler = (productId) => {
		delete cart[productId];
		setData({...data, cart: cart, totalCartItem: getTotalCartItem()});
      }


      return (
            <Fragment>
                  <Header 
                        toggleSidebar = {toggleSidebar}
                        toggleShoppingCart = {toggleShoppingCart}
                        totalCartItem = {totalCartItem}
                  />
                  <div id='bodyContainer'>
                        <SideBar 
                              isShowSidebar={isShowSidebar}
                        />
                        <Body
                              newProducts={newProducts}
                              bestProducts={bestProducts}
                              addToCartHandler={addToCartHandler}
                              isShowSidebar={isShowSidebar}
                              isShowShoppingCart={isShowShoppingCart}
				/>
                        <ShoppingCart
						isShowShoppingCart={isShowShoppingCart}
						cart={cart}
						setProductQuantityToCart={setProductQuantityToCart}
						productRemoveHandler={productRemoveHandler}
					/>
                  </div>
            </Fragment>
      )
}

export default Home;