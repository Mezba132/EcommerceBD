import React, { useState } from "react";

const CartProduct = ({ product, setProductQuantityToCart, productRemoveHandler }) => {

    const [quantity, setQuantity] = useState(1)

    const quantityChangeHandler = (e) => {
        let updateQuantity = parseInt(e.target.value);
        if(isNaN(updateQuantity) || updateQuantity === 0) {
            updateQuantity = 1;
            setProductQuantityToCart(product._id, updateQuantity);
        }
		if (quantity > 0) {
			setQuantity(updateQuantity);
			setProductQuantityToCart(product._id, updateQuantity);
		}
    }


    return(
        <div id='cartProductContainer'>
            <div id='cartImgContainer'>
                <img id='cartImg' src={product.images[0].url} alt='cart product'/>
            </div>
            <div id='cartProductTitleAndPrice'>
                <p id='cartProductTitle'>{product.title}</p>
                <p id='cartProductPrice'>${product.mrp_price}</p>
            </div>
            <div id="quantityContainer">
                <input
                    id='cartProductQuantity'
                    type='number'
                    value={quantity}
                    onChange={quantityChangeHandler}
                />
            </div>
            <div id="removeCartProduct">
                <span
                    id='removeCartProductIcon'
                    onClick={
                        () => productRemoveHandler(product._id)
                    }
                >
                    <i className="fa fa-times"></i>
                </span>
            </div>
        </div>
    );
}

export default CartProduct;