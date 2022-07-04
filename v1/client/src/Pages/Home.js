import React, {Fragment, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from '../Components/Layout/User/header';
import SideBar from '../Components/Layout/User/sidebar';
import Body from '../Components/Layout/User/body';
import { FetchProducts } from '../Redux/Actions';
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

      const [filteredData, setFilteredData] = useState({
		filters: {
			title: '',
			category: '',
			subs:[],
			color:[],
			brand:'',
			stock: '',
			createdDate:[]
		}
	})

	const dispatch = useDispatch()
	const { product } = useSelector(state => state)
	const products = product.getProducts;


	useEffect(() => {
		let isMounted = true
		if(isMounted) {
			loadProducts(filteredData.filters);
		}
		// cleanup
		return () => { isMounted = false }
	},[dispatch])

	const loadProducts = (currentFilters) => {
		dispatch(FetchProducts(currentFilters))
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
                              products={products}
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