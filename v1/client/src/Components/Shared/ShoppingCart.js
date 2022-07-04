import React from 'react';
import CartProduct from './Form/User/cartProduct';

const ShoppingCart = ({ isShowShoppingCart, cart, setProductQuantityToCart, productRemoveHandler }) => {
    const getCartStyle = () => {
		return isShowShoppingCart ? {right: '0px'} : {};
	}

    const renderEmptyCart = () => {
		return(
			<div id='emptyCart'>
				<i
					id='shoppingBagIcon'
					className='fa fa-shopping-basket'
				></i>
				<p id='emptyCartText'>Empty Cart</p>
			</div>
		);
	}

    const generateCart = () => {
		let cartItems = [];
		for (let index in cart) {
			cartItems.push(
				<div key={index}>
					<CartProduct
						product={cart[index].product}
						quantity={cart[index].quantity}
						productRemoveHandler={productRemoveHandler}
						setProductQuantityToCart={setProductQuantityToCart}
					/>
				</div>
			);
		}
		if (cartItems.length > 0) {
			return cartItems;
		}
		return renderEmptyCart();
    }

    const getTotalOrderPrice = () => {
		let price = 0;
		for (let index in cart) {
			price += cart[index].product.mrp_price * cart[index].quantity;
		}
		return price;
    }

    return (
        <div id='cartContainer' style={getCartStyle()}>
				<div id='cart'>
					{generateCart()}
				</div>
				<div id='orderButtonContainer'>
					<div id='orderButton'>
						<div id='placeOrder'>Place Order</div>
					<div id='orderPrice'>${getTotalOrderPrice()}</div>
					</div>
				</div>
			</div>
    )
}

export default ShoppingCart;